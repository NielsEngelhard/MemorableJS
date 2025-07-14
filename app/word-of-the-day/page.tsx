import PageBase from "@/components/layout/PageBase";
import Badge from "@/components/ui/Badge";
import BasicPageIntro from "@/components/ui/block/BasicPageIntro";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import CardHeader from "@/components/ui/card/CardHeader";
import FeatureHighlight from "@/components/ui/FeatureHighlight";
import { getLocalizedFullDayString } from "@/lib/date-util";
import { Brain, Calendar, Clock, Sparkles, Trophy } from "lucide-react";

export default function WordOfTheDayPage() {
    const available = true;

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
                            <Brain size={24} className="text-accent" />
                            <span className="text-accent text-xl">Today's Challenge</span>
                        </div>
                    </CardHeader>

                    <div className="text-center text-foreground-muted">
                        Every day at midnight <span className="font-medium">UTC+02:00</span>, we reveal a new carefully selected word for the entire LetterLeague community to solve.
                        Challenge yourself and compete with players worldwide to see who can guess today's word in the fewest attempts.                            
                    </div>                    

                    <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <FeatureHighlight
                            Icon={Clock}
                            title="Quick"
                            text="Just a few minutes of your time"
                            variant="orange"
                        />

                        <FeatureHighlight
                            Icon={Sparkles}
                            title="Refreshing"
                            text="Everyday a new hand-picked word"
                            variant="orange"
                        />

                        <FeatureHighlight
                            Icon={Trophy}
                            title="Statistics"
                            text="See yourself improve overtime"
                            variant="orange"
                        />                                                
                    </div>

                   <div className="flex flex-col gap-1">
                        <Button variant="orange" disabled={!available}>
                            Play!
                        </Button>
                        <div className="text-foreground-muted text-xs text-center">
                            Remember: You only get one attempt per day, so make it count!
                        </div>                    
                   </div>

                </CardBody>
            </Card>
        </PageBase>
    )
}