import BlockSelect, { SelectOption } from "@/components/ui/form/BlockSelect";
import { Clock } from "lucide-react";

const timerPerTurnOptions = [20, 30, 40, undefined];

interface Props {
    name?: string;
}

const options: SelectOption[] = [
    {
        value: 10,
        label: "10s",
        Icon: Clock
    },
    {
        value: 20,
        label: "20s",
        Icon: Clock
    },
    {
        value: 30,
        label: "30s",
        Icon: Clock
    },
    {
        value: 40,
        label: "40s",
        Icon: Clock
    },    
    {
        value: undefined,
        label: "∞"
    }
]

export default function TimePerTurnInput({ name = "timePerTurn" }: Props) {
    return (
        <BlockSelect
            title="Time per Turn"
            valueIndicator="seconds"
            name={name}
            options={options}            
        >
        </BlockSelect>
    )
}
