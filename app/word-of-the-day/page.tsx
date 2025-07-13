import PageBase from "@/components/layout/PageBase";
import Badge from "@/components/ui/Badge";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import CardHeader from "@/components/ui/card/CardHeader";
import { getLocalizedFullDayString } from "@/lib/date-util";
import { Calendar, Sparkles, Target } from "lucide-react";

export default function WordOfTheDayPage() {
    const available = false;

    return (
        <PageBase>
            <BasicPageIntro
                title="Word of the Day"
                subText={getLocalizedFullDayString()}
                Icon={Calendar}
                color="orange"
            >
                {available ? (
                    <Badge variant="success">
                        <Sparkles size={16} /> Challenge Available                        
                    </Badge>
                ) : (
                    <Badge variant="error">
                        <Sparkles size={16} /> Unavailable                       
                    </Badge>
                )}
            </BasicPageIntro>

            <Card className="w-full max-w-3xl items-center border-accent/20 border-1">
                <CardBody>
                    <CardHeader>
                        <div className="flex items-center justify-center w-full font-bold gap-1">
                            <Target size={24} className="text-accent" />
                            <span className="text-accent text-xl">Today's Challenge</span>
                        </div>
                    </CardHeader>

                    <div className="text-center text-foreground-muted">
                        Every day at midnight, we reveal a new carefully selected word for the entire LetterLeague community to solve.
                        Challenge yourself and compete with players worldwide to see who can guess today's word in the fewest attempts.                            
                    </div>                    

                </CardBody>
            </Card>
        </PageBase>
    )
}