import BlockSelect from "@/components/ui/form/BlockSelect";

const wordLengthOptions = [3, 4, 5, 6, 7];

interface Props {
    name?: string;
}

const options = wordLengthOptions.map(o => {
    return {
        value: o,
        label: o
    }
});

export default function WordLengthInput({ name = "wordLength" }: Props) {
    return (
        <BlockSelect
            title="Word length"
            valueIndicator="letters"
            name={name}
            options={options}
        >
        </BlockSelect>
    )
}