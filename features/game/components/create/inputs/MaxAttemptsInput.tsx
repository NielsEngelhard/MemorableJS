import BlockSelect from "@/components/ui/form/BlockSelect";
import { isDevelopmentEnvironment } from "@/lib/environmen-util";

const maxAttemptOptions = isDevelopmentEnvironment()
? [1, 4, 5, 6, 7]
: [4, 5, 6, 7];

interface Props {
    name?: string;
}

const options = maxAttemptOptions.map(o => {
    return {
        value: o,
        label: o
    }
});

export default function MaxAttemptsInput({ name = "maxAttemptsPerRound" }: Props) {
    return (
        <BlockSelect
            title="Attempts per round"
            valueIndicator="guesses"
            name={name}
            options={options}
        >
        </BlockSelect>
    )
}