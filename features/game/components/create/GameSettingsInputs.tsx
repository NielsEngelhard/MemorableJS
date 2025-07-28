"use client";

import { FormProvider, useForm } from "react-hook-form";
import WordLengthInput from "./inputs/WordLengthInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TotalRoundsInput from "./inputs/TotalRoundsInput";
import MaxAttemptsInput from "./inputs/MaxAttemptsInput";
import TimePerTurnInput from "./inputs/TimePerTurnInput";
import { redirect } from 'next/navigation';
import ShowFormErrors from "@/components/ui/form/ShowFormErrors";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import CreateGame from "../../actions/command/create-game";
import { CreateGameSchema, createGameSchema } from "../../schemas";

interface Props {
    gameMode: GameMode;
    children?: React.ReactNode;
}

export default function CreateGameForm({ gameMode, children }: Props) {
        const form = useForm<CreateGameSchema>({
            resolver: zodResolver(createGameSchema),
            defaultValues: {
                wordLength: 6,
                timePerTurn: undefined,
                totalRounds: 4,
                maxAttemptsPerRound: 6,
                gameVisibility: GameVisibility.Private,
                gameMode: gameMode
            }
        })  

    async function onSubmit(data: CreateGameSchema) {
        var gameId = await CreateGame(data);
        redirect(`/play/${gameId}`);
    }

    return (
            <form className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 lg:gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full">
                    <CardBody>
                        <FormProvider {...form}>
                            <div className="flex flex-col gap-2 lg:gap-4" >
                                <WordLengthInput></WordLengthInput>
                                <TotalRoundsInput></TotalRoundsInput>
                                <MaxAttemptsInput></MaxAttemptsInput>                        

                                {gameMode == GameMode.Multiplayer && (
                                    <>
                                        <TimePerTurnInput></TimePerTurnInput>
                                    </>
                                )}
                                <ShowFormErrors errors={form.formState.errors} />
                            </div>            
                        </FormProvider>                 
                    </CardBody>
                </Card>

                {children}
            </form>        
    )
}