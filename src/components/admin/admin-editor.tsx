"use client";

import { useMemo, useState } from "react";
import portfolioData from "@/content/portfolio.json";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };
type Path = readonly (string | number)[];
type AssetKey = "profile" | "resume" | "detailedCv";

const repository = {
  owner: "shivayogih",
  name: "shivayogi-portfolio",
  branch: "main",
  contentPath: "src/content/portfolio.json",
};

const assetPaths: Record<AssetKey, string> = {
  profile: "public/shivayogi-hiremath-profile.png",
  resume: "public/Shivayogi-Hiremath-Resume.pdf",
  detailedCv: "public/Shivayogi-Hiremath-Detailed-CV.pdf",
};

const sectionDescriptions: Record<string, string> = {
  person: "Identity, positioning, contact information, and profile image references.",
  site: "Browser metadata, public URL, and repository information.",
  navigation: "Labels and section anchors shown in the portfolio navigation.",
  socials: "GitHub, LinkedIn, Medium, and any other public profile links.",
  strengths: "The four capability summaries near the top of the portfolio.",
  experience: "Roles, clients, dates, outcomes, highlights, and technologies.",
  apps: "Public links and contribution summaries for applications you worked on.",
  projects: "The two featured product case studies: Toolly Scan and DataLoom.",
  skillGroups: "Grouped Android, architecture, testing, security, and delivery skills.",
  principles: "Engineering principles displayed in the portfolio.",
  leadership: "Leadership and collaboration statements.",
  education: "Degree, university, college, and completion year.",
};

function humanize(value: string | number) {
  if (typeof value === "number") return `Item ${value + 1}`;
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function cloneJson<T extends JsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function blankLike(value: JsonValue): JsonValue {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, blankLike(child)]),
    );
  }
  if (typeof value === "boolean") return false;
  if (typeof value === "number") return 0;
  return "";
}

function updateAtPath(root: JsonObject, path: Path, nextValue: JsonValue): JsonObject {
  const copy = cloneJson(root);
  let cursor: JsonObject | JsonValue[] = copy;

  path.slice(0, -1).forEach((segment) => {
    cursor = cursor[segment as never] as JsonObject | JsonValue[];
  });

  cursor[path[path.length - 1] as never] = nextValue as never;
  return copy;
}

function removeAtPath(root: JsonObject, path: Path): JsonObject {
  const copy = cloneJson(root);
  let cursor: JsonObject | JsonValue[] = copy;
  path.slice(0, -1).forEach((segment) => {
    cursor = cursor[segment as never] as JsonObject | JsonValue[];
  });
  if (!Array.isArray(cursor)) return copy;
  cursor.splice(Number(path[path.length - 1]), 1);
  return copy;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

async function fileToBase64(file: Blob) {
  return bytesToBase64(new Uint8Array(await file.arrayBuffer()));
}

async function imageFileToPng(file: File) {
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("The selected profile image could not be read."));
      element.src = objectUrl;
    });
    const maxDimension = 1200;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("The browser could not prepare the profile image.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Profile image conversion failed."))),
        "image/png",
      );
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function githubRequest<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(error?.message ?? `GitHub returned ${response.status}.`);
  }

  return (await response.json()) as T;
}

function validateContent(content: JsonObject) {
  const person = content.person as JsonObject | undefined;
  const projects = content.projects as JsonValue[] | undefined;
  if (!person || typeof person.name !== "string" || !person.name.trim()) {
    throw new Error("Person → Name is required.");
  }
  if (typeof person.email !== "string" || !person.email.includes("@")) {
    throw new Error("Person → Email must be a valid email address.");
  }
  if (!Array.isArray(projects) || projects.length !== 2) {
    throw new Error("Featured projects must continue to contain exactly two entries.");
  }
  const projectSlugs = projects.map((project) =>
    project && typeof project === "object" && !Array.isArray(project) ? project.slug : null,
  );
  if (projectSlugs[0] !== "toolly" || projectSlugs[1] !== "dataloom") {
    throw new Error("The two featured project routes must remain Toolly Scan and DataLoom.");
  }

  const inspect = (value: JsonValue, path: Path = []) => {
    if (Array.isArray(value)) {
      value.forEach((child, index) => inspect(child, [...path, index]));
      return;
    }
    if (!value || typeof value !== "object") return;
    Object.entries(value).forEach(([key, child]) => {
      if (key === "href" && typeof child === "string") {
        try {
          const url = new URL(child);
          if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
        } catch {
          throw new Error(`${path.map(humanize).join(" → ")} → ${humanize(key)} is not a valid web link.`);
        }
      }
      inspect(child, [...path, key]);
    });
  };
  inspect(content);
}

type FieldEditorProps = {
  label: string | number;
  value: JsonValue;
  path: Path;
  onChange: (path: Path, value: JsonValue) => void;
  onRemove?: (path: Path) => void;
  canRemove?: boolean;
  depth?: number;
};

function FieldEditor({
  label,
  value,
  path,
  onChange,
  onRemove,
  canRemove = false,
  depth = 0,
}: FieldEditorProps) {
  const title = humanize(label);
  const fieldId = `admin-${path.join("-")}`;
  const [expanded, setExpanded] = useState(path.length === 1 && path[0] === "person");

  if (Array.isArray(value)) {
    const primitiveList = value.every(
      (item) => item === null || ["string", "number", "boolean"].includes(typeof item),
    );
    if (primitiveList) {
      return (
        <label className="admin-field admin-field--wide" htmlFor={fieldId}>
          <span>{title}</span>
          <small>Enter one value per line.</small>
          <textarea
            id={fieldId}
            rows={Math.min(9, Math.max(3, value.length + 1))}
            value={value.map(String).join("\n")}
            onChange={(event) =>
              onChange(
                path,
                event.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
      );
    }

    const lockedCollection = path.length === 1 && path[0] === "projects";
    return (
      <details
        className="admin-group admin-group--collection"
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary>{title}</summary>
        {expanded ? (
          <div className="admin-collection admin-collection--embedded">
            {path.length === 1 && sectionDescriptions[String(path[0])] ? (
              <p>{sectionDescriptions[String(path[0])]}</p>
            ) : null}
            <div className="admin-collection__items">
              {value.map((item, index) => (
                <FieldEditor
                  key={`${fieldId}-${index}`}
                  label={index}
                  value={item}
                  path={[...path, index]}
                  onChange={onChange}
                  onRemove={lockedCollection ? undefined : onRemove}
                  canRemove={!lockedCollection}
                  depth={depth + 1}
                />
              ))}
            </div>
            {!lockedCollection ? (
              <button
                className="admin-button admin-button--secondary"
                type="button"
                onClick={() => {
                  const template = value.length ? blankLike(value[value.length - 1]) : "";
                  onChange(path, [...value, template]);
                }}
              >
                Add {title.replace(/s$/, "")}
              </button>
            ) : (
              <small>Toolly Scan and DataLoom stay as the two featured project slots.</small>
            )}
          </div>
        ) : null}
      </details>
    );
  }

  if (value && typeof value === "object") {
    return (
      <details
        className="admin-group"
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary>{title}</summary>
        {expanded ? (
          <>
            {canRemove && onRemove ? (
              <div className="admin-group__remove-row">
                <button
                  className="admin-remove"
                  type="button"
                  onClick={() => onRemove(path)}
                >
                  Remove this item
                </button>
              </div>
            ) : null}
            {path.length === 1 && sectionDescriptions[String(path[0])] ? (
              <p>{sectionDescriptions[String(path[0])]}</p>
            ) : null}
            <div className="admin-fields">
              {Object.entries(value).map(([key, child]) => (
                <FieldEditor
                  key={`${fieldId}-${key}`}
                  label={key}
                  value={child}
                  path={[...path, key]}
                  onChange={onChange}
                  onRemove={onRemove}
                  depth={depth + 1}
                />
              ))}
            </div>
          </>
        ) : null}
      </details>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-checkbox" htmlFor={fieldId}>
        <input
          id={fieldId}
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
        />
        <span>{title}</span>
      </label>
    );
  }

  const stringValue = value === null ? "" : String(value);
  const longField =
    stringValue.length > 90 ||
    /summary|description|heroSupport|overview|problem|approach|architecture|decisions|challenges|outcome|contribution/i.test(
      String(label),
    );

  return (
    <label className={`admin-field${longField ? " admin-field--wide" : ""}`} htmlFor={fieldId}>
      <span>{title}</span>
      {longField ? (
        <textarea
          id={fieldId}
          rows={Math.min(8, Math.max(3, Math.ceil(stringValue.length / 80)))}
          value={stringValue}
          onChange={(event) => onChange(path, event.target.value)}
        />
      ) : (
        <input
          id={fieldId}
          type={typeof value === "number" ? "number" : "text"}
          value={stringValue}
          onChange={(event) =>
            onChange(path, typeof value === "number" ? Number(event.target.value) : event.target.value)
          }
        />
      )}
    </label>
  );
}

export function AdminEditor() {
  const initialContent = useMemo(
    () => cloneJson(portfolioData as unknown as JsonObject),
    [],
  );
  const [draft, setDraft] = useState<JsonObject>(initialContent);
  const [token, setToken] = useState("");
  const [assets, setAssets] = useState<Partial<Record<AssetKey, File>>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const updateField = (path: Path, value: JsonValue) => {
    setDraft((current) => updateAtPath(current, path, value));
  };

  const removeField = (path: Path) => {
    setDraft((current) => removeAtPath(current, path));
  };

  const verifyAccess = async () => {
    setBusy(true);
    setError("");
    setStatus("Checking repository access…");
    try {
      await githubRequest(
        `/repos/${repository.owner}/${repository.name}`,
        token.trim(),
      );
      setStatus("GitHub access confirmed. The token is held only in this page session.");
    } catch (accessError) {
      setStatus("");
      setError(accessError instanceof Error ? accessError.message : "GitHub access failed.");
    } finally {
      setBusy(false);
    }
  };

  const loadLatest = async () => {
    setBusy(true);
    setError("");
    setStatus("Loading the latest content from GitHub…");
    try {
      const file = await githubRequest<{ content: string }>(
        `/repos/${repository.owner}/${repository.name}/contents/${repository.contentPath}?ref=${repository.branch}`,
        token.trim(),
      );
      const compact = file.content.replace(/\s/g, "");
      const bytes = Uint8Array.from(atob(compact), (character) => character.charCodeAt(0));
      const latest = JSON.parse(new TextDecoder().decode(bytes)) as JsonObject;
      validateContent(latest);
      setDraft(latest);
      setStatus("Latest published content loaded from GitHub.");
    } catch (loadError) {
      setStatus("");
      setError(loadError instanceof Error ? loadError.message : "Could not load current content.");
    } finally {
      setBusy(false);
    }
  };

  const publish = async () => {
    setBusy(true);
    setError("");
    setStatus("Validating portfolio content…");
    try {
      if (!token.trim()) throw new Error("Enter a GitHub token before publishing.");
      if (!confirmed) throw new Error("Confirm the deployment checkbox before publishing.");
      validateContent(draft);

      const assetEntries = Object.entries(assets) as [AssetKey, File][];
      assetEntries.forEach(([key, file]) => {
        const limit = key === "profile" ? 8_000_000 : 20_000_000;
        if (file.size > limit) throw new Error(`${file.name} is too large for this publisher.`);
      });

      setStatus("Preparing one GitHub commit…");
      const ref = await githubRequest<{ object: { sha: string } }>(
        `/repos/${repository.owner}/${repository.name}/git/ref/heads/${repository.branch}`,
        token.trim(),
      );
      const parent = await githubRequest<{ tree: { sha: string } }>(
        `/repos/${repository.owner}/${repository.name}/git/commits/${ref.object.sha}`,
        token.trim(),
      );

      const contentBlob = await githubRequest<{ sha: string }>(
        `/repos/${repository.owner}/${repository.name}/git/blobs`,
        token.trim(),
        {
          method: "POST",
          body: JSON.stringify({
            content: `${JSON.stringify(draft, null, 2)}\n`,
            encoding: "utf-8",
          }),
        },
      );

      const treeEntries: { path: string; mode: "100644"; type: "blob"; sha: string }[] = [
        {
          path: repository.contentPath,
          mode: "100644",
          type: "blob",
          sha: contentBlob.sha,
        },
      ];

      for (const [key, file] of assetEntries) {
        const source = key === "profile" ? await imageFileToPng(file) : file;
        const blob = await githubRequest<{ sha: string }>(
          `/repos/${repository.owner}/${repository.name}/git/blobs`,
          token.trim(),
          {
            method: "POST",
            body: JSON.stringify({ content: await fileToBase64(source), encoding: "base64" }),
          },
        );
        treeEntries.push({
          path: assetPaths[key],
          mode: "100644",
          type: "blob",
          sha: blob.sha,
        });
      }

      const tree = await githubRequest<{ sha: string }>(
        `/repos/${repository.owner}/${repository.name}/git/trees`,
        token.trim(),
        {
          method: "POST",
          body: JSON.stringify({ base_tree: parent.tree.sha, tree: treeEntries }),
        },
      );
      const commit = await githubRequest<{ sha: string; html_url: string }>(
        `/repos/${repository.owner}/${repository.name}/git/commits`,
        token.trim(),
        {
          method: "POST",
          body: JSON.stringify({
            message: "content: update portfolio from admin",
            tree: tree.sha,
            parents: [ref.object.sha],
          }),
        },
      );
      await githubRequest(
        `/repos/${repository.owner}/${repository.name}/git/refs/heads/${repository.branch}`,
        token.trim(),
        {
          method: "PATCH",
          body: JSON.stringify({ sha: commit.sha, force: false }),
        },
      );

      setAssets({});
      setConfirmed(false);
      setStatus(
        `Published commit ${commit.sha.slice(0, 7)}. GitHub Pages will usually update within a few minutes.`,
      );
    } catch (publishError) {
      setStatus("");
      setError(publishError instanceof Error ? publishError.message : "Publishing failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div className="shell admin-hero__grid">
          <div>
            <p className="eyebrow">Separate publishing workspace</p>
            <h1>Portfolio admin</h1>
            <p>
              Update the profile, contact details, links, experience, apps, projects, skills,
              education, profile image, and CV files from one page.
            </p>
          </div>
          <aside className="admin-security-note">
            <strong>GitHub-backed and session-only</strong>
            <p>
              Your token is never saved to local storage or committed to the repository. Closing or
              refreshing this tab clears it.
            </p>
          </aside>
        </div>
      </section>

      <div className="shell admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-panel">
            <h2>1. Connect GitHub</h2>
            <p>
              Use a fine-grained token limited to this repository with <strong>Contents: read and write</strong>.
            </p>
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noreferrer"
            >
              Create a GitHub token ↗
            </a>
            <label className="admin-field admin-field--wide" htmlFor="github-token">
              <span>GitHub token</span>
              <input
                id="github-token"
                type="password"
                value={token}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => setToken(event.target.value)}
                placeholder="github_pat_…"
              />
            </label>
            <div className="admin-button-row">
              <button
                className="admin-button admin-button--secondary"
                type="button"
                disabled={busy || !token.trim()}
                onClick={verifyAccess}
              >
                Verify access
              </button>
              <button
                className="admin-button admin-button--secondary"
                type="button"
                disabled={busy || !token.trim()}
                onClick={loadLatest}
              >
                Load latest
              </button>
            </div>
          </div>

          <div className="admin-panel">
            <h2>2. Replace files</h2>
            <label className="admin-upload" htmlFor="profile-upload">
              <span>Profile image</span>
              <small>JPG, PNG, or WebP · converted to PNG</small>
              <input
                id="profile-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) =>
                  setAssets((current) => ({ ...current, profile: event.target.files?.[0] }))
                }
              />
            </label>
            <label className="admin-upload" htmlFor="resume-upload">
              <span>Two-page resume</span>
              <small>PDF</small>
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={(event) =>
                  setAssets((current) => ({ ...current, resume: event.target.files?.[0] }))
                }
              />
            </label>
            <label className="admin-upload" htmlFor="cv-upload">
              <span>Detailed CV</span>
              <small>PDF</small>
              <input
                id="cv-upload"
                type="file"
                accept="application/pdf"
                onChange={(event) =>
                  setAssets((current) => ({ ...current, detailedCv: event.target.files?.[0] }))
                }
              />
            </label>
          </div>

          <div className="admin-panel admin-publish-panel">
            <h2>3. Publish</h2>
            <label className="admin-checkbox" htmlFor="publish-confirmation">
              <input
                id="publish-confirmation"
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
              />
              <span>I reviewed these changes and want to deploy them.</span>
            </label>
            <button
              className="admin-button admin-button--primary"
              type="button"
              disabled={busy || !token.trim() || !confirmed}
              onClick={publish}
            >
              {busy ? "Working…" : "Publish website changes"}
            </button>
            {status ? <p className="admin-status" role="status">{status}</p> : null}
            {error ? <p className="admin-error" role="alert">{error}</p> : null}
          </div>
        </aside>

        <div className="admin-editor" role="region" aria-label="Portfolio content editor">
          <div className="admin-editor__heading">
            <div>
              <p className="eyebrow">Editable website data</p>
              <h2>Every portfolio value</h2>
            </div>
            <button
              className="admin-button admin-button--secondary"
              type="button"
              onClick={() => {
                setDraft(cloneJson(initialContent));
                setError("");
                setStatus("Editor reset to the content bundled with this deployment.");
              }}
            >
              Reset editor
            </button>
          </div>

          {Object.entries(draft).map(([key, value]) => (
            <FieldEditor
              key={key}
              label={key}
              value={value}
              path={[key]}
              onChange={updateField}
              onRemove={removeField}
              canRemove={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
