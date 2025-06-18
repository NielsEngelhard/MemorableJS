import PageBase from "@/components/layout/PageBase";
import Card from "@/components/ui/Card";
import FadedText from "@/components/ui/text/FadedText";

export default function Play() {
    return (
        <PageBase>
            <div className="font-bold text-xl text-center">
                <FadedText>Choose Your Game</FadedText>
            </div>

            <p className="text-sm lg:text-lg text-foreground-muted text-center font-semibold max-w-xl">
                Discover our collection of thoughtfully designed games. Each one crafted for the modern, sophisticated player.
            </p>            

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                <Card></Card>
                <Card></Card>
            </div>            
        </PageBase>
    )
}