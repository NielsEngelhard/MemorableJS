import React from "react";

interface Props {
    title: string;
    text: string;
    Icon: React.ElementType;
}

export default function FeatureHighlight({ title, text, Icon }: Props) {
    return (
        <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Icon className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="font-medium text-orange-800">{title}</div>
            <div className="text-orange-600">{text}</div>
        </div>        
    );
}