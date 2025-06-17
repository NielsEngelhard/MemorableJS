import React from "react";
import Label from "./Label";

interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
    placeholder?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            {label && <Label text={label} />}

            <input className="border-[1px] border-border px-3 py-2 text-sm rounded-md" type={type} ref={ref} {...props} />
        </div>
    )
});

export default TextInput;