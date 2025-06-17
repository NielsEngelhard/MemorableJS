interface Props {
    children: React.ReactNode;
}

export default function Modal({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    )
}