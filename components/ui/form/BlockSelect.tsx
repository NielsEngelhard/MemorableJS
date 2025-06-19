"use client";

import { Controller, useFormContext } from "react-hook-form";
import Card from "../card/Card";

export type SelectOption = {
    label: any;
    value: any;
    Icon?: React.ElementType;
}

interface Props {
    name: string; // Field name for react-hook-form
    options: SelectOption[];
    title?: string;
    valueIndicator?: string;
    Icon?: React.ElementType;
    valuePostfix?: string;
}

export default function BlockSelect({name, options, title, valueIndicator, Icon, valuePostfix}: Props) {
    const { control, watch } = useFormContext();
    const value = watch(name);

    function ShowSelectOption(option: SelectOption,  index: number, onClick: () => void) {
        return (
            <button
                key={index}
                onClick={onClick}
                className={`border-2 border-border py-2 rounded-sm cursor-pointer px-6 lg:px-0
                ${option.value == value ? 'border-primary bg-primary/10 !font-semibold' : 'hover:border-primary/60 bg-border/20'}`}>
                <div className="flex flex-row justify-center items-center text-center">
                    {Icon && <Icon className="w-4 h-4 text-text mr-1" />}
                    {option.Icon && <option.Icon className="w-4 h-4 text-text mr-1" />}
                    {option.label}
                    {valuePostfix && <div>{valuePostfix}</div>}
                </div>                
            </button>
        )
    }
    
    return (
        <div>
            {/* Indicator */}
            <div className="flex items-center justify-between">
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                {valueIndicator && <span className="text-sm text-foreground-muted font-semibold">{value} {valueIndicator}</span>}
            </div>

            {/* Options */}
            <Controller control={control} name={name} render={({ field }) => (
                <div className="flex lg:grid overflow-y-scroll lg:overflow-auto gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
                    {options.map((option, index) => (
                        ShowSelectOption(option, index, () => {
                            field.onChange(option.value);
                        })
                    ))}
                </div>
            )}></Controller>                      
        </div>    
    )
}