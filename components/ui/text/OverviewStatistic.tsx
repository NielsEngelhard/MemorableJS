interface Props {
    label: string;
    value: any;
}

export default function OverviewStatistic({ label, value }: Props) {    
    return (
        <div className="flex flex-row justify-between text-sm text-foreground-muted">
            <div>{label}</div>
            <div>{value}</div>
        </div>
    )
}