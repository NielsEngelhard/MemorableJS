import Loading from "@/components/ui/Loading";
import { GameTeaserModel } from "../../models";
import ActiveGameCard from "./activeGameCard";

interface Props {
    activeGames: GameTeaserModel[] | undefined;
}

export default function ActiveGamesList({ activeGames }: Props) {
    return (
        <>
            {activeGames ? (
                <ul className="w-full flex flex-col gap-3 lg:gap-5">
                    {activeGames.map((activeGame, index) => {
                        return <ActiveGameCard key={index} activeGame={activeGame} />
                    })}
                </ul>
            ) : (
                <Loading message="Searching for active games ..."></Loading>
            )}        
        </>
    );
}