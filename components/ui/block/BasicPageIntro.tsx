import { ArrowLeft } from "lucide-react";
import Button from "../Button";
import TextWithIcon from "../text/TextWithIcon";
import TitleText from "../text/TitleText";

interface Props {
    title: string;
    subText: string;
}

export default function BasicPageIntro({ title, subText }: Props) {
    return (
        <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-col gap-2">
                <TitleText faded={true}>{title}</TitleText>
                <div className="text-xl text-foreground-muted">{subText}</div>
            </div>

            <div>
                <Button variant="skeleton" className="font-medium items-center">
                    <TextWithIcon Icon={ArrowLeft}>Back to HUB</TextWithIcon>
                </Button>                
            </div>
        </div>
    )
}