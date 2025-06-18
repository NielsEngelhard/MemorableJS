import React from "react";

interface Props {
    children: React.ReactNode;
    fromColor?: string; // Tailwind class string like  "from-blue-500"
    toColor?: string;   // Tailwind class string like "to-green-500"
}

export default function CardHeader({
    children,
    fromColor = "from-primary/90",
    toColor = "to-primary"
}: Props) {
    return (
        <div className={`bg-gradient-to-br ${fromColor} ${toColor} h-32 w-full`}>
            {children}
        </div>
    );
}
