import type { components } from "../../api/schema";
import CodePopover from "./CodePopover";
import DataTable, { DataTableCell, formatUnixTimestamp } from "./DataTable";

type RankingEntry = components["schemas"]["RankingEntry"];

type Props = {
  ranking: RankingEntry[];
};

export default function RankingTable({ ranking }: Props) {
  const showCode = ranking.some((entry) => entry.code != null);

  return (
    <DataTable
      headers={[
        "順位",
        "プレイヤー",
        "スコア",
        "提出時刻",
        ...(showCode ? ["コード"] : []),
      ]}
    >
      {ranking.map((entry, index) => (
        <tr key={entry.player.user_id}>
          <DataTableCell>{index + 1}</DataTableCell>
          <DataTableCell>
            {entry.player.display_name}
            {entry.player.label && ` (${entry.player.label})`}
          </DataTableCell>
          <DataTableCell>{entry.score}</DataTableCell>
          <DataTableCell>
            {formatUnixTimestamp(entry.submitted_at)}
          </DataTableCell>
          {showCode && (
            <DataTableCell>
              {entry.code != null && entry.code_html != null && (
                <CodePopover code={entry.code} html={entry.code_html} />
              )}
            </DataTableCell>
          )}
        </tr>
      ))}
    </DataTable>
  );
}
