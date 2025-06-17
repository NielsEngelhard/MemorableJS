interface Props {
    text: string;
}

export default function Label({ text }: Props) {
    return (
        <label className="text-sm font-bold">{text}</label>
    )
}