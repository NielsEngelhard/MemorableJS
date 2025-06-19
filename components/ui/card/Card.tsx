import React from "react";

export interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Card({ children, className }: Props) {
    return (
        <div className={`flex flex-col duration-300 transition-all rounded-lg overflow-hidden border-border border-2 bg-white ${className}`}>
            {children}
        </div>
    )
}