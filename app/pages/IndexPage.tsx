import BorderedContainer from "../components/BorderedContainer";
import NavigateLink from "../components/NavigateLink";
import { BASE_PATH } from "../config";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-y-6">
      <img
        src={`${BASE_PATH}logo.svg`}
        alt="PHPerKaigi 2026"
        className="w-96 h-auto"
      />
      <div className="text-center">
        <div className="font-bold text-transparent bg-clip-text bg-brand-600">
          <div className="text-6xl">PHPER CODE BATTLE</div>
        </div>
      </div>
      <div className="mx-2">
        <BorderedContainer>
          <p className="text-gray-900 max-w-prose">
            PHPer コードバトルは指示された動作をする PHP
            コードをより短く書けた方が勝ち、という 1 対 1 の対戦コンテンツです。
            3/20 の day 0 と 3/21 の day 1 では、2/28
            に実施されたオフライン予選と、当日まで開催しているオンライン予選を勝ち抜いたプレイヤーによるトーナメント形式での
            PHPer コードバトルを実施します。ここでは短いコードが正義です！
            可読性も保守性も放り投げた、イベントならではのコードをお楽しみください！
          </p>
          <div className="mt-4 pt-4 border-t border-gray-300 max-w-prose">
            <p className="font-bold text-gray-900">追記</p>
            <p className="mt-2 text-gray-900">
              イベントは終了しました。ご参加いただいたみなさま、ありがとうございました！
              出題された問題や提出コード、トーナメント結果はこちらからご覧いただけます（勝敗が決した後も
              PHPerKaigi
              の会期中は提出が可能でした。閲覧できるのは最終的な提出コードで、コードバトルの場で書いたものとは異なる場合があります）。
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <NavigateLink to="/dashboard/">問題一覧</NavigateLink>
              <NavigateLink to="/tournament/1/">トーナメント結果</NavigateLink>
            </div>
          </div>
        </BorderedContainer>
      </div>
    </div>
  );
}
