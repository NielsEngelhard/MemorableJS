interface Props {
    text?: string;
}

export default function ErrorText({text}: Props) {
    return (
        text &&
            <div className="text-error text-sm font-medium">{text}</div>
    )
}