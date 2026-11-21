import type { components } from "../../api/schema";
import ProblemColumn from "../Gaming/ProblemColumn";
import RankingTable from "../Gaming/RankingTable";
import TitledColumn from "../TitledColumn";
import TwoColumnLayout from "../TwoColumnLayout";

type RankingEntry = components["schemas"]["RankingEntry"];

type Props = {
  gameDisplayName: string;
  problemTitle: string;
  problemDescription: string;
  sampleCode: string;
  sampleCodeHtml: string;
  ranking: RankingEntry[];
};

export default function GolfWatchAppGamingMultiplayer({
  gameDisplayName,
  problemTitle,
  problemDescription,
  sampleCode,
  sampleCodeHtml,
  ranking,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="text-white bg-brand-600 px-4 py-4">
        <div className="font-bold text-center text-3xl">{gameDisplayName}</div>
      </div>
      <TwoColumnLayout>
        <ProblemColumn
          title={problemTitle}
          description={problemDescription}
          sampleCode={sampleCode}
          sampleCodeHtml={sampleCodeHtml}
        />
        <TitledColumn title="順位表">
          <RankingTable ranking={ranking} />
        </TitledColumn>
      </TwoColumnLayout>
    </div>
  );
}
