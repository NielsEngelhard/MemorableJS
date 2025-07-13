import React from "react";
import FadedText from "./FadedText";
interface Props {
    children: React.ReactNode;
    faded?: boolean;
}
export default function TitleText({ children, faded = false }: Props) {
    return (
        <div className="text-xl font-semibold leading-none tracking-tight">
            {faded
            ? <FadedText>{children}</FadedText>
            : children
            }
        </div>
    )
}