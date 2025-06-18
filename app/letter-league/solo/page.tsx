import PageBase from "@/components/layout/PageBase";
import { GameMode } from "@/features/game/constants";
import CreateLetterLeagueGameForm from "@/features/letter-league/components/CreateLetterLeagueGameForm";

export default function SoloLetterLeagueGamePage() {
    return (
        <PageBase>
            <CreateLetterLeagueGameForm gameMode={GameMode.Solo}></CreateLetterLeagueGameForm>
        </PageBase>
    )
}