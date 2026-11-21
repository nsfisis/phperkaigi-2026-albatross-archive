// Renders every page of the site into dist/ as static HTML, with the data
// each page needs embedded for hydration. Run after `vite build`.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import type { PageData } from "./app/pageData";

type EntryServer = {
  render: (data: PageData) => string;
  pageTitle: (data: PageData) => string;
};

async function readData<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(`data/${path}`, "utf8")) as T;
}

async function collectPages(): Promise<[string, PageData][]> {
  const { games } = await readData<{
    games: { game_id: number; display_name: string }[];
  }>("games.json");

  const pages: [string, PageData][] = [
    ["", { page: "index" }],
    [
      "dashboard/",
      {
        page: "dashboard",
        games: games.map(({ game_id, display_name }) => ({
          game_id,
          display_name,
        })),
      },
    ],
  ];
  for (const { game_id } of games) {
    const { game } = await readData<Extract<PageData, { page: "watch" }>>(
      `games/${game_id}.json`,
    );
    const { ranking } = await readData<Extract<PageData, { page: "watch" }>>(
      `games/${game_id}/watch/ranking.json`,
    );
    pages.push([`golf/${game_id}/watch/`, { page: "watch", game, ranking }]);
  }
  for (const file of await readdir("data/tournaments")) {
    const id = file.replace(/\.json$/, "");
    const { tournament } = await readData<
      Extract<PageData, { page: "tournament" }>
    >(`tournaments/${file}`);
    pages.push([`tournament/${id}/`, { page: "tournament", tournament }]);
  }
  return pages;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true },
});
try {
  const { render, pageTitle } = (await vite.ssrLoadModule(
    "/app/entry-server.tsx",
  )) as EntryServer;
  const template = await readFile("dist/index.html", "utf8");

  for (const [path, data] of await collectPages()) {
    const json = JSON.stringify(data).replaceAll("<", "\\u003c");
    // Use replacer functions so that "$" in the content is not interpreted as
    // a replacement pattern (submitted code may contain "$'" or "$&").
    const html = template
      .replace(
        "</head>",
        () => `<title>${escapeHtml(pageTitle(data))}</title></head>`,
      )
      .replace(
        '<div id="root"></div>',
        () =>
          `<div id="root">${render(data)}</div><script id="page-data" type="application/json">${json}</script>`,
      );
    await mkdir(`dist/${path}`, { recursive: true });
    await writeFile(`dist/${path}index.html`, html);
    console.log(`dist/${path}index.html`);
  }
} finally {
  await vite.close();
}
