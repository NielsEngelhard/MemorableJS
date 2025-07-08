"use client";

import { FormProvider, useForm } from "react-hook-form";
import WordLengthInput from "./inputs/WordLengthInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TotalRoundsInput from "./inputs/TotalRoundsInput";
import MaxAttemptsInput from "./inputs/MaxAttemptsInput";
import VisibilityInput from "./inputs/VisibilityInput";
import TimePerTurnInput from "./inputs/TimePerTurnInput";
import Button from "@/components/ui/Button";
import { Play } from "lucide-react";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { redirect } from 'next/navigation';
import ShowFormErrors from "@/components/ui/form/ShowFormErrors";
import { GameVisibility } from "@/drizzle/schema/enum/game-visibility";
import { GameMode } from "@/drizzle/schema/enum/game-mode";
import CreateGame from "../../actions/command/create-game";
import { CreateGameSchema, createGameSchema } from "../../schemas";

interface Props {
    gameMode: GameMode;
}

export default function CreateGameForm({ gameMode }: Props) {
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
        var response = await CreateGame(data);
        redirect(`/play/${response.gameId}`);
    }

    return (
        <Card className="w-full">
            <CardBody>
                <FormProvider {...form}>
                    <form className="flex flex-col gap-2 lg:gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <WordLengthInput></WordLengthInput>
                        <TotalRoundsInput></TotalRoundsInput>
                        <MaxAttemptsInput></MaxAttemptsInput>                        

                        {gameMode == GameMode.Multiplayer && (
                            <>
                                <TimePerTurnInput></TimePerTurnInput>
                                <VisibilityInput></VisibilityInput>
                            </>
                        )}

                        <Button type="submit">
                            <TextWithIcon Icon={Play}>Start Game</TextWithIcon>
                        </Button>
                        <ShowFormErrors errors={form.formState.errors} />
                    </form>            
                </FormProvider>                 
            </CardBody>
        </Card>
    )
}