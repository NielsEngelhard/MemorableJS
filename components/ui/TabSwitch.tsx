export type Tab = {
    index: number;
    label: string;
}

interface Props {
    tabs: Tab[];
}

export default function TabSwitch({ tabs }: Props) {
    return (
        <div className="w-full bg-foreground-muted/5 rounded-sm">
            lol
        </div>
    )
}