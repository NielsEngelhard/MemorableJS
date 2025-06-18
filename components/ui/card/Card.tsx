import React from "react";

export interface Props {
    children: React.ReactNode;
}

export default function Card({ children }: Props) {
    return (
        <div className="flex flex-col duration-300 transition-all shadow-lg hover:scale-105 rounded-lg overflow-hidden">
            {children}
        </div>
    )
}