import { cva, VariantProps } from "class-variance-authority";
import React from "react";

// Define the variant styles separately from the cva function
const variants = {
  primary: {
    wrapper: "bg-primary/20",
    icon: "text-primary",
    title: "text-primary",
    text: "text-primary/80"
  },  
    orange: {
    wrapper: "bg-orange-50",
    icon: "text-orange-600",
    title: "text-orange-800",
    text: "text-orange-600"
  },
};

// Use cva for the base component styling
const featureHighlightVariants = cva("text-center p-3 rounded-lg", {
  variants: {
    variant: {
      orange: "",
      primary: "",
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

interface Props extends VariantProps<typeof featureHighlightVariants> {
  title: string;
  text: string;
  Icon?: React.ElementType;
}

export default function FeatureHighlight({ title, text, Icon, variant = "primary" }: Props) {
  // Get the base styles
  const baseStyles = featureHighlightVariants({ variant });
  
  // Get the specific variant styles
  const variantClasses = variant ? variants[variant as keyof typeof variants] : variants.orange;
  
  return (
    <div className={`${baseStyles} ${variantClasses.wrapper}`}>
      {Icon && <Icon className={`w-5 h-5 mx-auto mb-1 ${variantClasses.icon}`} />}
      <div className={`font-semibold ${variantClasses.title}`}>{title}</div>
      <div className={`text-sm ${variantClasses.text}`}>{text}</div>
    </div>
  );
}