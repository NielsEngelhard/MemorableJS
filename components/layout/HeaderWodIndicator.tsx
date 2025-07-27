import Link from "next/link";
import Badge from "../ui/Badge";
import { Calendar, Sparkles } from "lucide-react";
import { WORD_OF_THE_DAY_ROUTE } from "@/lib/routes";
import { utcDateIsToday } from "@/features/word-of-the-day/util/wod-util";

interface Props {
    lastPlayedDate?: Date | null | undefined;
}

export default function HeaderWodIndicator({ lastPlayedDate }: Props) {
    const available = utcDateIsToday(lastPlayedDate) == false;

    return (
        <Link href={WORD_OF_THE_DAY_ROUTE}>
            {available ? (
                <Badge variant="accent" size="md">
                    <Calendar size={12} />
                    WoD available!
                    <Sparkles size={12} />
                </Badge>                 
            ) : (
                <Badge variant="error" size="md">
                    <Calendar size={12} />
                    Played
                    <Sparkles size={12} />
                </Badge>                 
            )}                       
        </Link>        
    )
}