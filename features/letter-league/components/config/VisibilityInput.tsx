import BlockSelect from "@/components/ui/form/BlockSelect";

const maxAttemptOptions = [4, 5, 6, 7];

interface Props {
    name?: string;
}

const options = maxAttemptOptions.map(o => {
    return {
        value: o,
        label: o
    }
});

export default function VisibilityInput({ name = "maxAttemptsPerRound" }: Props) {
    return (
        <div>TODO</div>
    )
}