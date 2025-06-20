import React from "react"

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function CardBody({ children, className }: Props) {
    return (
        <div className={`p-4 flex flex-col gap-2 flex-1 ${className}`}>
            {children}
        </div>
    )
}