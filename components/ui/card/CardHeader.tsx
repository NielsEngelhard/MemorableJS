import React from "react"

interface Props {
    children: React.ReactNode;
}

export default function CardHeader({ children }: Props) {
    return (
            <div className="bg-gradient-to-br from-primary/90 to-primary h-32 w-full">
                {children}
            </div>
    )
}