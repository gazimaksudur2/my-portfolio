"use client";

import { useMemo, useState } from "react";
import {
  commitContentFile,
  downloadJson,
  getActionsUrl,
  getContentFile,
} from "@/lib/github";
import { getStoredToken } from "@/lib/auth";
import {
  contentSchemas,
  type ContentFileKey,
  type SiteContent,
} from "@/lib/schemas";
import { contentFilePaths } from "@/lib/content";
import ItemForm, {
  createEmptyItem,
  getItemLabel,
  getItemListKey,
} from "./ItemForm";

type CommitResult = {
  commitSha: string | undefined;
  htmlUrl: string | null | undefined;
  path: string;
};

type ContentEditorProps = {
  contentKey: ContentFileKey;
  initialData: unknown;
  title: string;
  description?: string;
};

function formatZodError(error: {
  issues: { path: (string | number)[]; message: string }[];
}): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
}

function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

export default function ContentEditor({
  contentKey,
  initialData,
  title,
  description,
}: ContentEditorProps) {
  const [data, setData] = useState(() => cloneData(initialData));
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(initialData, null, 2)
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [commitInfo, setCommitInfo] = useState<CommitResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draftItem, setDraftItem] = useState<Record<string, unknown> | null>(
    null
  );

  const listKey = getItemListKey(contentKey);
  const schema = contentSchemas[contentKey];

  const items = useMemo(() => {
    if (!listKey) return [];
    const record = data as Record<string, unknown>;
    const list = record[listKey];
    return Array.isArray(list) ? (list as Record<string, unknown>[]) : [];
  }, [data, listKey]);

  const siteData = contentKey === "site" ? (data as SiteContent) : null;

  function syncJsonFromData(next: unknown) {
    setJsonText(JSON.stringify(next, null, 2));
  }

  function setDataAndJson(next: unknown) {
    setData(next);
    syncJsonFromData(next);
    setErrors([]);
    setStatus(null);
    setCommitInfo(null);
  }

  function parseWorkingData(): { ok: true; value: unknown } | { ok: false } {
    if (jsonMode) {
      try {
        return { ok: true, value: JSON.parse(jsonText) as unknown };
      } catch (err) {
        setErrors([
          err instanceof Error ? `JSON parse error: ${err.message}` : "Invalid JSON",
        ]);
        return { ok: false };
      }
    }
    return { ok: true, value: data };
  }

  function validate(value: unknown) {
    const result = schema.safeParse(value);
    if (!result.success) {
      setErrors(formatZodError(result.error));
      return null;
    }
    setErrors([]);
    return result.data;
  }

  async function handleCommit() {
    setStatus(null);
    setCommitInfo(null);
    const parsed = parseWorkingData();
    if (!parsed.ok) return;
    const valid = validate(parsed.value);
    if (!valid) return;

    const token = getStoredToken();
    if (!token) {
      setErrors(["Sign in with a GitHub PAT to commit changes."]);
      return;
    }

    setSaving(true);
    try {
      const result = await commitContentFile(
        token,
        contentKey,
        valid,
        `chore(content): update ${contentFilePaths[contentKey]} via admin`
      );
      setDataAndJson(valid);
      setCommitInfo(result);
      setStatus("Committed to GitHub. Actions deploy should start shortly.");
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "Commit failed. Check token permissions.",
      ]);
    } finally {
      setSaving(false);
    }
  }

  function handleDownload() {
    setStatus(null);
    setCommitInfo(null);
    const parsed = parseWorkingData();
    if (!parsed.ok) return;
    const valid = validate(parsed.value);
    if (!valid) return;
    const filename = contentFilePaths[contentKey].split("/").pop() || `${contentKey}.json`;
    downloadJson(filename, valid);
    setStatus(`Downloaded ${filename}`);
  }

  async function loadFromGitHub() {
    const token = getStoredToken();
    if (!token) {
      setErrors(["Sign in with a GitHub PAT to load remote content."]);
      return;
    }
    setLoadingRemote(true);
    setErrors([]);
    try {
      const remote = await getContentFile(token, contentKey);
      setDataAndJson(remote.content);
      setStatus(`Loaded remote ${remote.path} (sha ${remote.sha.slice(0, 7)})`);
    } catch (err) {
      setErrors([
        err instanceof Error ? err.message : "Failed to load remote file.",
      ]);
    } finally {
      setLoadingRemote(false);
    }
  }

  function openNewItem() {
    setDraftItem(createEmptyItem(contentKey));
    setEditingIndex(-1);
  }

  function openEditItem(index: number) {
    setDraftItem(cloneData(items[index]));
    setEditingIndex(index);
  }

  function applyItemDraft() {
    if (draftItem == null || editingIndex == null || !listKey) return;
    const record = cloneData(data) as Record<string, unknown>;
    const list = Array.isArray(record[listKey])
      ? [...(record[listKey] as Record<string, unknown>[])]
      : [];
    if (editingIndex === -1) {
      list.push(draftItem);
    } else {
      list[editingIndex] = draftItem;
    }
    record[listKey] = list;
    setDataAndJson(record);
    setEditingIndex(null);
    setDraftItem(null);
  }

  function deleteItem(index: number) {
    if (!listKey) return;
    if (!window.confirm("Delete this item from the draft?")) return;
    const record = cloneData(data) as Record<string, unknown>;
    const list = [...(record[listKey] as Record<string, unknown>[])];
    list.splice(index, 1);
    record[listKey] = list;
    setDataAndJson(record);
  }

  function updatePersonalInfo(field: keyof SiteContent["personalInfo"], value: string) {
    if (!siteData) return;
    const next: SiteContent = {
      ...siteData,
      personalInfo: {
        ...siteData.personalInfo,
        [field]: value,
      },
    };
    setDataAndJson(next);
  }

  function updateSectionMeta(
    field: "badge" | "title" | "titleAccent" | "description",
    value: string
  ) {
    if (!listKey) return;
    const record = cloneData(data) as Record<string, unknown> & {
      section?: Record<string, string>;
    };
    record.section = {
      ...(record.section ?? {}),
      [field]: value,
    };
    setDataAndJson(record);
  }

  const personalFields: (keyof SiteContent["personalInfo"])[] = [
    "name",
    "title",
    "tagline",
    "email",
    "phone",
    "location",
    "logo",
    "resumeLink",
    "resumeDriveLink",
    "linkedIn",
    "github",
    "facebook",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-syne text-2xl font-bold text-content-primary sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-content-muted">
              {description}
            </p>
          )}
          <p className="mt-1 font-mono text-xs text-accent-cyan/80">
            {contentFilePaths[contentKey]}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              if (jsonMode) {
                const parsed = parseWorkingData();
                if (!parsed.ok) return;
                setData(parsed.value);
                setJsonMode(false);
              } else {
                syncJsonFromData(data);
                setJsonMode(true);
              }
            }}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-content-muted hover:border-accent-cyan/40 hover:text-content-primary"
          >
            {jsonMode ? "Structured view" : "Advanced JSON"}
          </button>
          <button
            type="button"
            onClick={loadFromGitHub}
            disabled={loadingRemote}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-content-muted hover:border-accent-cyan/40 hover:text-content-primary disabled:opacity-50"
          >
            {loadingRemote ? "Loading…" : "Load from GitHub"}
          </button>
        </div>
      </div>

      {!jsonMode && contentKey === "site" && siteData && (
        <section className="glass-card space-y-4 rounded-2xl p-5">
          <h2 className="font-syne text-lg font-semibold text-content-primary">
            Personal info
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {personalFields.map((field) => (
              <label key={field} className="block text-sm text-content-muted">
                {field}
                <input
                  type="text"
                  value={siteData.personalInfo[field]}
                  onChange={(e) => updatePersonalInfo(field, e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 text-content-primary outline-none focus:border-accent-cyan"
                />
              </label>
            ))}
          </div>
          <p className="text-xs text-content-muted">
            Use Advanced JSON for nav links, banner, about, SEO, and other nested site fields.
          </p>
        </section>
      )}

      {!jsonMode && listKey && (
        <>
          {"section" in (data as object) && (
            <section className="glass-card space-y-3 rounded-2xl p-5">
              <h2 className="font-syne text-lg font-semibold text-content-primary">
                Section meta
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["badge", "title", "titleAccent", "description"] as const).map(
                  (field) => {
                    const section = (data as { section?: Record<string, string> })
                      .section;
                    return (
                      <label
                        key={field}
                        className={`block text-sm text-content-muted ${
                          field === "description" ? "sm:col-span-2" : ""
                        }`}
                      >
                        {field}
                        {field === "description" ? (
                          <textarea
                            value={section?.[field] ?? ""}
                            onChange={(e) =>
                              updateSectionMeta(field, e.target.value)
                            }
                            rows={2}
                            className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 text-content-primary outline-none focus:border-accent-cyan"
                          />
                        ) : (
                          <input
                            type="text"
                            value={section?.[field] ?? ""}
                            onChange={(e) =>
                              updateSectionMeta(field, e.target.value)
                            }
                            className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 text-content-primary outline-none focus:border-accent-cyan"
                          />
                        )}
                      </label>
                    );
                  }
                )}
              </div>
            </section>
          )}

          <section className="glass-card rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-syne text-lg font-semibold text-content-primary">
                {listKey === "categories" ? "Categories" : "Items"} ({items.length})
              </h2>
              <button
                type="button"
                onClick={openNewItem}
                className="rounded-lg bg-accent-green/15 px-3 py-2 text-sm font-medium text-accent-green hover:bg-accent-green/25"
              >
                Add item
              </button>
            </div>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={`${String(item.id ?? index)}-${index}`}
                  className="flex flex-col gap-2 rounded-xl border border-white/5 bg-bg-secondary/60 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-content-primary">
                      {getItemLabel(contentKey, item)}
                    </p>
                    <p className="font-mono text-xs text-content-muted">
                      {typeof item.id === "string" ? item.id : `#${index + 1}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditItem(index)}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-accent-cyan hover:border-accent-cyan/40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(index)}
                      className="rounded-lg border border-red-500/20 px-3 py-1.5 text-sm text-red-300 hover:border-red-400/40"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-sm text-content-muted">No items yet.</li>
              )}
            </ul>
          </section>
        </>
      )}

      {jsonMode && (
        <section className="glass-card rounded-2xl p-5">
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setErrors([]);
              setStatus(null);
              setCommitInfo(null);
            }}
            spellCheck={false}
            rows={24}
            className="w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-3 font-mono text-xs leading-relaxed text-content-primary outline-none focus:border-accent-cyan"
          />
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleCommit}
          disabled={saving}
          className="rounded-lg bg-accent-cyan/20 px-4 py-2.5 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/30 disabled:opacity-50"
        >
          {saving ? "Committing…" : "Commit to GitHub"}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-content-primary hover:border-accent-cyan/40"
        >
          Download JSON
        </button>
      </div>

      {errors.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="mb-2 text-sm font-medium text-red-200">
            Validation / save errors
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-red-300">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {status && (
        <div className="rounded-xl border border-accent-green/30 bg-accent-green/10 px-4 py-3 text-sm text-accent-green">
          {status}
        </div>
      )}

      {commitInfo && (
        <div className="glass-card space-y-2 rounded-xl p-4 text-sm">
          <p className="text-content-primary">
            Commit{" "}
            <span className="font-mono text-accent-cyan">
              {commitInfo.commitSha?.slice(0, 7) ?? "unknown"}
            </span>
          </p>
          {commitInfo.htmlUrl && (
            <a
              href={commitInfo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-accent-cyan underline-offset-2 hover:underline"
            >
              View commit on GitHub
            </a>
          )}
          <a
            href={getActionsUrl()}
            target="_blank"
            rel="noreferrer"
            className="block text-accent-cyan underline-offset-2 hover:underline"
          >
            Open GitHub Actions
          </a>
        </div>
      )}

      {editingIndex != null && draftItem && (
        <ItemForm
          contentKey={contentKey}
          item={draftItem}
          onChange={setDraftItem}
          onClose={() => {
            setEditingIndex(null);
            setDraftItem(null);
          }}
          onSave={applyItemDraft}
          title={editingIndex === -1 ? "Add item" : "Edit item"}
        />
      )}
    </div>
  );
}
