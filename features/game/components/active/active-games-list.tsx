import Loading from "@/components/ui/Loading";
import { GameTeaserModel } from "../../models";
import ActiveGameCard from "./activeGameCard";

interface Props {
    activeGames: GameTeaserModel[] | undefined;
    onDelete?: (gameId: string) => void;
}

export default function ActiveGamesList({ activeGames, onDelete }: Props) {

    return (
        <>
            {activeGames ? (
                activeGames.length <= 0 ? (
                    <div className="text-foreground-muted text-sm">No active games found...</div>                    
                ) : (
                    <ul className="w-full flex flex-col gap-3 lg:gap-5">
                        {activeGames.map((activeGame, index) => {
                            return <ActiveGameCard key={index} activeGame={activeGame} onDelete={onDelete} />
                        })}
                    </ul>                    
                )
            ) : (
                <Loading message="Searching for active games ..."></Loading>
            )}        
        </>
    );
}