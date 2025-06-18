interface Props {
    Icon: React.ElementType;    
    children: React.ReactNode;
    size?: number;
}

export default function TextWithIcon({ children, Icon, size = 14 }: Props) {
    return (
        <div className="flex items-center gap-1">
            <Icon size={size} /> {children}
        </div>
    )
}