"use client";

import { useEffect, useState } from "react";
import type { ContentFileKey } from "@/lib/schemas";

type FieldKind = "string" | "boolean" | "stringArray" | "nullableString";

type FieldDef = {
  key: string;
  label: string;
  kind: FieldKind;
};

const COMMON_FIELDS: Partial<Record<ContentFileKey, FieldDef[]>> = {
  projects: [
    { key: "id", label: "ID", kind: "string" },
    { key: "projectTitle", label: "Title", kind: "string" },
    { key: "projectType", label: "Type", kind: "string" },
    { key: "projectDescription", label: "Description", kind: "string" },
    { key: "featured", label: "Featured", kind: "boolean" },
    { key: "skills", label: "Skills (comma-separated)", kind: "stringArray" },
    { key: "liveSiteLink", label: "Live site URL", kind: "string" },
    { key: "bannerImgUrl", label: "Banner image URL", kind: "string" },
    { key: "features", label: "Features (one per line)", kind: "stringArray" },
  ],
  experience: [
    { key: "id", label: "ID", kind: "string" },
    { key: "title", label: "Title", kind: "string" },
    { key: "org", label: "Organization", kind: "string" },
    { key: "period", label: "Period", kind: "string" },
    { key: "icon", label: "Icon", kind: "string" },
    { key: "current", label: "Current role", kind: "boolean" },
    { key: "tech", label: "Tech (comma-separated)", kind: "stringArray" },
    { key: "points", label: "Points (one per line)", kind: "stringArray" },
  ],
  education: [
    { key: "id", label: "ID", kind: "string" },
    { key: "degree", label: "Degree", kind: "string" },
    { key: "institution", label: "Institution", kind: "string" },
    { key: "institutionShort", label: "Short name", kind: "string" },
    { key: "period", label: "Period", kind: "string" },
    { key: "cgpa", label: "CGPA", kind: "string" },
    { key: "focus", label: "Focus", kind: "string" },
    { key: "logo", label: "Logo URL", kind: "string" },
    { key: "primary", label: "Primary", kind: "boolean" },
  ],
  skills: [
    { key: "id", label: "ID", kind: "string" },
    { key: "title", label: "Title", kind: "string" },
    { key: "icon", label: "Icon", kind: "string" },
    { key: "accent", label: "Accent color", kind: "string" },
    { key: "skills", label: "Skills (comma-separated)", kind: "stringArray" },
  ],
  certifications: [
    { key: "id", label: "ID", kind: "string" },
    { key: "title", label: "Title", kind: "string" },
    { key: "issuer", label: "Issuer", kind: "string" },
    { key: "platform", label: "Platform", kind: "string" },
    { key: "date", label: "Date", kind: "string" },
    { key: "description", label: "Description", kind: "string" },
    { key: "certificateUrl", label: "Certificate URL", kind: "string" },
    { key: "verificationUrl", label: "Verification URL", kind: "string" },
    { key: "type", label: "Type", kind: "string" },
    { key: "tags", label: "Tags (comma-separated)", kind: "stringArray" },
  ],
  achievements: [
    { key: "id", label: "ID", kind: "string" },
    { key: "title", label: "Title", kind: "string" },
    { key: "description", label: "Description", kind: "string" },
    { key: "year", label: "Year", kind: "string" },
    { key: "icon", label: "Icon", kind: "string" },
    { key: "link", label: "Link (empty = null)", kind: "nullableString" },
  ],
};

function isMultiline(key: string) {
  return (
    key === "description" ||
    key === "projectDescription" ||
    key === "points" ||
    key === "features"
  );
}

function arrayToInput(value: unknown, multiline: boolean): string {
  if (!Array.isArray(value)) return "";
  return multiline
    ? value.map(String).join("\n")
    : value.map(String).join(", ");
}

function inputToArray(raw: string, multiline: boolean): string[] {
  if (multiline) {
    return raw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function getValue(item: Record<string, unknown>, key: string): unknown {
  return item[key];
}

type ItemFormProps = {
  contentKey: ContentFileKey;
  item: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  onClose: () => void;
  onSave: () => void;
  title?: string;
};

export default function ItemForm({
  contentKey,
  item,
  onChange,
  onClose,
  onSave,
  title = "Edit item",
}: ItemFormProps) {
  const fields = COMMON_FIELDS[contentKey] ?? [];
  const [showRaw, setShowRaw] = useState(false);
  const [rawText, setRawText] = useState(() =>
    JSON.stringify(item, null, 2)
  );
  const [rawError, setRawError] = useState<string | null>(null);

  useEffect(() => {
    setRawText(JSON.stringify(item, null, 2));
    setRawError(null);
  }, [item]);

  function updateField(key: string, kind: FieldKind, raw: string | boolean) {
    const next = { ...item };
    if (kind === "boolean") {
      next[key] = Boolean(raw);
    } else if (kind === "stringArray") {
      next[key] = inputToArray(String(raw), isMultiline(key));
    } else if (kind === "nullableString") {
      const trimmed = String(raw).trim();
      next[key] = trimmed === "" ? null : trimmed;
    } else {
      next[key] = String(raw);
    }
    onChange(next);
  }

  function applyRaw() {
    try {
      const parsed = JSON.parse(rawText) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        setRawError("Item must be a JSON object.");
        return;
      }
      setRawError(null);
      onChange(parsed as Record<string, unknown>);
      setShowRaw(false);
    } catch (err) {
      setRawError(err instanceof Error ? err.message : "Invalid JSON");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
      <div className="glass-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-syne text-xl font-bold text-content-primary">
              {title}
            </h2>
            <p className="text-sm text-content-muted">
              Structured fields plus optional raw JSON for the full item.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-content-muted hover:text-content-primary"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setShowRaw(false)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              !showRaw
                ? "bg-accent-cyan/20 text-accent-cyan"
                : "text-content-muted hover:text-content-primary"
            }`}
          >
            Fields
          </button>
          <button
            type="button"
            onClick={() => {
              setRawText(JSON.stringify(item, null, 2));
              setShowRaw(true);
            }}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              showRaw
                ? "bg-accent-cyan/20 text-accent-cyan"
                : "text-content-muted hover:text-content-primary"
            }`}
          >
            Raw JSON
          </button>
        </div>

        {!showRaw ? (
          <div className="space-y-3">
            {fields.map((field) => {
              const value = getValue(item, field.key);
              if (field.kind === "boolean") {
                return (
                  <label
                    key={field.key}
                    className="flex items-center gap-2 text-sm text-content-muted"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(e) =>
                        updateField(field.key, "boolean", e.target.checked)
                      }
                      className="h-4 w-4 accent-cyan-400"
                    />
                    {field.label}
                  </label>
                );
              }

              const useTextarea =
                field.kind === "stringArray"
                  ? isMultiline(field.key)
                  : isMultiline(field.key);
              const display =
                field.kind === "stringArray"
                  ? arrayToInput(value, useTextarea)
                  : field.kind === "nullableString"
                    ? value == null
                      ? ""
                      : String(value)
                    : value == null
                      ? ""
                      : String(value);

              if (useTextarea) {
                return (
                  <label
                    key={field.key}
                    className="block text-sm text-content-muted"
                  >
                    {field.label}
                    <textarea
                      value={display}
                      onChange={(e) =>
                        updateField(field.key, field.kind, e.target.value)
                      }
                      rows={field.kind === "stringArray" ? 4 : 3}
                      className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 text-content-primary outline-none focus:border-accent-cyan"
                    />
                  </label>
                );
              }

              return (
                <label
                  key={field.key}
                  className="block text-sm text-content-muted"
                >
                  {field.label}
                  <input
                    type="text"
                    value={display}
                    onChange={(e) =>
                      updateField(field.key, field.kind, e.target.value)
                    }
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 text-content-primary outline-none focus:border-accent-cyan"
                  />
                </label>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full rounded-lg border border-white/10 bg-bg-secondary px-3 py-2 font-mono text-xs text-content-primary outline-none focus:border-accent-cyan"
            />
            {rawError && (
              <p className="text-sm text-red-300">{rawError}</p>
            )}
            <button
              type="button"
              onClick={applyRaw}
              className="rounded-lg bg-accent-violet/30 px-3 py-2 text-sm text-content-primary hover:bg-accent-violet/40"
            >
              Apply JSON to fields
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-content-muted hover:text-content-primary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-accent-cyan/20 px-4 py-2 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/30"
          >
            Apply to draft
          </button>
        </div>
      </div>
    </div>
  );
}

export function createEmptyItem(
  contentKey: ContentFileKey
): Record<string, unknown> {
  const stamp = `item-${Date.now()}`;
  switch (contentKey) {
    case "projects":
      return {
        id: stamp,
        featured: false,
        projectType: "New project",
        projectTitle: "Untitled project",
        projectDescription: "Description",
        skills: [],
        liveSiteLink: "https://example.com",
        githubClientRepoLink: null,
        githubServerRepoLink: null,
        bannerImgUrl: "https://example.com/banner.png",
        features: [],
      };
    case "experience":
      return {
        id: stamp,
        period: "YYYY – Present",
        title: "Role title",
        org: "Organization",
        icon: "FiBriefcase",
        current: false,
        tech: [],
        points: [],
      };
    case "education":
      return {
        id: stamp,
        period: "YYYY – YYYY",
        degree: "Degree",
        institution: "Institution",
        institutionShort: "Short",
        logo: "https://example.com/logo.png",
        primary: false,
      };
    case "skills":
      return {
        id: stamp,
        title: "Category",
        icon: "FiTool",
        accent: "#00f5ff",
        skills: [],
      };
    case "certifications":
      return {
        id: stamp,
        title: "Certification",
        issuer: "Issuer",
        platform: "Platform",
        date: "YYYY-MM",
        certificateUrl: "https://example.com/cert",
        type: "pdf",
        description: "Description",
        verificationUrl: "https://example.com/verify",
        tags: [],
      };
    case "achievements":
      return {
        id: stamp,
        title: "Achievement",
        description: "Description",
        year: "YYYY",
        icon: "FiAward",
        link: null,
      };
    default:
      return { id: stamp };
  }
}

export function getItemListKey(
  contentKey: ContentFileKey
): "items" | "categories" | null {
  if (contentKey === "site") return null;
  if (contentKey === "skills") return "categories";
  return "items";
}

export function getItemLabel(
  contentKey: ContentFileKey,
  item: Record<string, unknown>
): string {
  if (typeof item.projectTitle === "string") return item.projectTitle;
  if (typeof item.title === "string") return item.title;
  if (typeof item.degree === "string") return item.degree;
  if (typeof item.id === "string") return item.id;
  return "Untitled";
}
