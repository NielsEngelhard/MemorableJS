"use client";

import { FormProvider, useForm } from "react-hook-form";
import WordLengthInput from "./config/WordLengthInput";
import { CreateLetterLeagueGame, createLetterLeagueGameSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TotalRoundsInput from "./config/TotalRoundsInput";
import MaxAttemptsInput from "./config/MaxAttemptsInput";

export default function CreateLetterLeagueGameForm({ }) {
        const form = useForm<CreateLetterLeagueGame>({
            resolver: zodResolver(createLetterLeagueGameSchema),
            defaultValues: {
                wordLength: 6,
                timePerTurn: 40,
                totalRounds: 4,
                maxAttemptsPerRound: 6
            }
        })  

    async function onSubmit(data: CreateLetterLeagueGame) {

    }

    return (
        <Card className="w-full">
            <CardBody>
                <FormProvider {...form}>
                    <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <WordLengthInput></WordLengthInput>
                        <TotalRoundsInput></TotalRoundsInput>
                        <MaxAttemptsInput></MaxAttemptsInput>
                    </form>            
                </FormProvider>                 
            </CardBody>
        </Card>
    )
}