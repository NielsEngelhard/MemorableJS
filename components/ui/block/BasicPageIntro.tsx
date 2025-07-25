import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

interface Props extends VariantProps<typeof introVariants> {
    title: string;
    subText: string;
    children?: React.ReactNode;
    Icon?: React.ElementType;
}

const introVariants = cva(
  "",
  {
    variants: {
      color: {
        primary: "bg-primary",
        orange: "from-orange-400 to-orange-600",
      }
    },
    defaultVariants: {
      color: "primary"
    },
  }
)

export default function BasicPageIntro({ title, subText, children, Icon, color }: Props) {
    return (
        <div className="mb-8 flex flex-col gap-2 lg:gap-4">
          <div className="text-center">
            
                {Icon && (
                  <div className={`bg-gradient-to-r p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${cn(introVariants({ color }))}`}>
                    <div className="p-2 rounded-full">
                        <Icon className="text-white w-8 h-8" />
                    </div>
                  </div>
                )}
            
            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2 ${cn(introVariants({ color }))}`}>
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
