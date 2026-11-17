import { Octokit } from "@octokit/rest";
import type { ContentFileKey } from "./schemas";
import { contentFilePaths } from "./content";

function repoConfig() {
  return {
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || "gazimaksudur2",
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO || "gazimaksudur",
    branch: process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main",
  };
}

export function createOctokit(token: string) {
  return new Octokit({ auth: token });
}

export async function verifyToken(token: string) {
  const octokit = createOctokit(token);
  const { owner, repo } = repoConfig();
  const { data: user } = await octokit.users.getAuthenticated();
  await octokit.repos.get({ owner, repo });
  return { login: user.login, name: user.name };
}

export async function getContentFile(token: string, key: ContentFileKey) {
  const octokit = createOctokit(token);
  const { owner, repo, branch } = repoConfig();
  const path = contentFilePaths[key];
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  });

  if (Array.isArray(data) || data.type !== "file" || !("content" in data)) {
    throw new Error(`Unexpected response for ${path}`);
  }

  const decoded = typeof window === "undefined"
    ? Buffer.from(data.content, "base64").toString("utf8")
    : decodeURIComponent(
        Array.from(atob(data.content.replace(/\n/g, "")), (c) =>
          "%" + c.charCodeAt(0).toString(16).padStart(2, "0")
        ).join("")
      );

  return {
    path,
    sha: data.sha,
    content: JSON.parse(decoded) as unknown,
  };
}

export async function commitContentFile(
  token: string,
  key: ContentFileKey,
  content: unknown,
  message: string
) {
  const octokit = createOctokit(token);
  const { owner, repo, branch } = repoConfig();
  const path = contentFilePaths[key];

  let sha: string | undefined;
  try {
    const existing = await getContentFile(token, key);
    sha = existing.sha;
  } catch {
    sha = undefined;
  }

  const body = JSON.stringify(content, null, 2) + "\n";
  const encoded =
    typeof window === "undefined"
      ? Buffer.from(body, "utf8").toString("base64")
      : btoa(unescape(encodeURIComponent(body)));

  const { data } = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: encoded,
    branch,
    sha,
  });

  return {
    commitSha: data.commit.sha,
    htmlUrl: data.commit.html_url,
    path,
  };
}

export function getActionsUrl() {
  const { owner, repo } = repoConfig();
  return `https://github.com/${owner}/${repo}/actions`;
}

export function getRepoUrl() {
  const { owner, repo } = repoConfig();
  return `https://github.com/${owner}/${repo}`;
}

/** Download JSON locally (mock / offline mode). */
export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2) + "\n"], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
