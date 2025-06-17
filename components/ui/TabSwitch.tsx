export type Tab = {
    index: number;
    label: string;
}

interface Props {
    activeTabIndex: number;
    tabs: Tab[];
    onTabChange: (index: number) => void;
}

export default function TabSwitch({ tabs, activeTabIndex, onTabChange }: Props) {
    return (
        <div className="w-full bg-foreground-muted/5 rounded-sm flex flex-row">
            {tabs.map((item, index) => (
                <button
                    key={index}
                    onClick={() => onTabChange(index)}
                    className={`flex-1 text-center m-1 p-1 cursor-pointer text-sm font-semibold ${index == activeTabIndex ? 'bg-background' : 'text-foreground-muted/75'}`}>
                    {item.label}
                </button>
            ))}
        </div>
    )
}