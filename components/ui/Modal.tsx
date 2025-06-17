interface Props {
    isVisible: boolean;
    children: React.ReactNode;
}

export default function Modal({ isVisible, children }: Props) {
    return (
        ( isVisible &&
            <div>
                {children}
            </div>
        )
    )
}