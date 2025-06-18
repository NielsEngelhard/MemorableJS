import React from "react"

interface Props {
    children: React.ReactNode;
}

export default function PageBase({ children }: Props) {
    return (
        <div className="max-w-5xl px-2 my-4 w-full flex flex-col gap-3 items-center">
            {children}
        </div>        
    )
}