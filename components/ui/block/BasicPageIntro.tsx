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
        <div className="mb-8 flex flex-col gap-2 lg:gap-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {Icon && (
                    <div className="p-2 rounded-full">
                        <Icon className="text-white w-8 h-8" />
                    </div>
                )}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {subText}
            </p>
          </div> 
          <div className="flex justify-center">
            {children}
          </div>
        </div>        
    )
}