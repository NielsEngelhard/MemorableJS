import { useState } from 'react';

interface Props {
    label: string;
    initialValue?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function SwitchInput({ label, initialValue = false, onChange }: Props) {
    const [isChecked, setIsChecked] = useState(initialValue);

    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="w-full flex flex-row justify-between items-center text-sm font-medium">
            <div>{label}</div>
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isChecked ? 'bg-primary' : 'bg-gray-200'
                }`}
            >
                <span className="sr-only">{label}</span>
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isChecked ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );
}