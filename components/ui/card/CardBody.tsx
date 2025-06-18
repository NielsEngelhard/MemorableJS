import React from "react"

interface Props {
    children: React.ReactNode;
}

export default function CardBody({ children }: Props) {
    return (
        <div className="p-4 flex flex-col gap-2">
            {children}
        </div>
    )
}