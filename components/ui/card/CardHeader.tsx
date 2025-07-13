import React from "react";

interface Props {
    children: React.ReactNode;
}

export default function CardHeader({
    children,
}: Props) {
    return (
        <div className={`w-full py-2 flex flex-row gap-2 items-center`}>
            {children}
        </div>
    );
}
