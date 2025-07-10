import TitleText from "../text/TitleText";
import React from "react";

interface Props {
    title: string;
    subText: string;
    children?: React.ReactNode;
    Icon?: React.ElementType;
}

export default function BasicPageIntro({ title, subText, children, Icon }: Props) {
    return (
        <div className="flex flex-col w-full items-center text-center justify-center gap-2 lg:gap-4">
            {Icon && (
                <div className="bg-gradient-to-bl from-primary to-secondary p-2 rounded-full">
                    <Icon className="text-white w-8 h-8" />
                </div>
            )}
            <TitleText faded={true}>{title}</TitleText>
            <div className="text-lg text-foreground-muted font-medium max-w-xl">{subText}</div>
            {children}
        </div>
    )
}