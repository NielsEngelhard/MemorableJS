import React from "react";
import Label from "./Label";
import ErrorText from "../ui/text/ErrorText";

interface InputProps extends React.ComponentProps<"input"> {
    label?: string;
    placeholder?: string;
    errorMsg?: string;
    required?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, required = false, errorMsg, id, ...props }, ref) => {
    return (
        <div className="flex flex-col">
            {label && <Label text={label} required={required} />}

            <input className={`
                    ${errorMsg ? "border-error" : "border-border"}
                    border-[1px] px-3 py-2 text-sm rounded-md`}
                type={type} ref={ref} {...props} required={required} />
            <ErrorText text={errorMsg} />
        </div>
    )
});

export default TextInput;