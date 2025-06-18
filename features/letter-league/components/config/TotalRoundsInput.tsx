import BlockSelect from "@/components/ui/form/BlockSelect";

const totalRoundsOptions = [3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
    name?: string;
}

const options = totalRoundsOptions.map(o => {
    return {
        value: o,
        label: o
    }
});

export default function TotalRoundsInput({ name = "totalRounds" }: Props) {
    return (
        <BlockSelect
            title="Total Rounds"
            valueIndicator="rounds"
            name={name}
            options={options}
        >
        </BlockSelect>
    )
}