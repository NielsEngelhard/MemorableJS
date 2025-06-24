interface Props {
    text: string;
    Icon?: React.ElementType;
}

export default function SubTitleText({ text, Icon }: Props) {
    return (
        <div className="flex gap-1 text-lg font-semibold tracking-tight items-center">
            {Icon && <Icon></Icon>}
            {text}
        </div>             
    )
}