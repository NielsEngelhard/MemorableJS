import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SwitchInput from "@/components/ui/form/SwitchInput";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { LetterText } from "lucide-react";

export default function GuessedLettersOverview() {
    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText
                    text="Hints"
                    Icon={LetterText}
                />

                <div className="flex flex-col gap-4">
                    <SwitchInput label="On-screen keyboard" />
                    <SwitchInput label="Sound effects" />
                </div>
            </CardBody>
        </Card>            
    )
}