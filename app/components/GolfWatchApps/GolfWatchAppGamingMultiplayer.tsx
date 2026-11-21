import type { SupportedLanguage } from "../../types/SupportedLanguage";
import ProblemColumn from "../Gaming/ProblemColumn";
import RankingTable from "../Gaming/RankingTable";
import TitledColumn from "../TitledColumn";
import TwoColumnLayout from "../TwoColumnLayout";

type Props = {
  gameDisplayName: string;
  problemTitle: string;
  problemDescription: string;
  problemLanguage: SupportedLanguage;
  sampleCode: string;
};

export default function GolfWatchAppGamingMultiplayer({
  gameDisplayName,
  problemTitle,
  problemDescription,
  problemLanguage,
  sampleCode,
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
          language={problemLanguage}
          sampleCode={sampleCode}
        />
        <TitledColumn title="順位表">
          <RankingTable problemLanguage={problemLanguage} />
        </TitledColumn>
      </TwoColumnLayout>
    </div>
  );
}
