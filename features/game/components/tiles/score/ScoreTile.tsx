import { useActiveGame } from "@/features/game/active-game-context";
import SinglePlayerScoreTile from "./SinglePlayerScoreTile";
import MultiplePlayersScoreTile from "./MultiplePlayersScoreTile";

export default function ScoreTile() {
    const { players } = useActiveGame();
    
    if (players.length == 1) {
        return <SinglePlayerScoreTile score={players[0].score} />;
    } else if (players.length > 1) {
        return <MultiplePlayersScoreTile players={players} />;
    }
}