interface Props {
    children: React.ReactNode;
}

export default function FadedText({ children }: Props) {
    return (
        <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {children}
        </div>
    )
}