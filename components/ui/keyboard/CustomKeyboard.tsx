import KeyboardKey from "./KeyboardKey";

const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

interface Props {
    onKeyPress: (key: string) => void;
    correctKeys?: string[];
    warningKeys?: string[];
    errorKeys?: string[];
}

export default function CustomKeyboard({ correctKeys, warningKeys, errorKeys, onKeyPress }: Props) {
    function determineKeyVariant(keyboardKey: string): "neutral" | "success" | "warning" | "error" | null | undefined {
        if (warningKeys?.includes(keyboardKey.toLowerCase())) return "warning";
        if (correctKeys?.includes(keyboardKey.toLowerCase())) return "success";        
        if (errorKeys?.includes(keyboardKey.toLowerCase())) return "error";

        return "neutral";
    }

    return (
        <div className="flex flex-col gap-1.5 lg:gap-2.5 items-center">
            {keyboardRows.map((keyboardRow, index) => (
                <div className="flex flex-row gap-1.5 lg:gap-2.5" key={`kb-row-${index}`}>
                    {keyboardRow.map((keyboardKey, index) => (
                        <KeyboardKey
                            key={`kb-key-${index}`}
                            letter={keyboardKey} onClick={onKeyPress}
                            variant={determineKeyVariant(keyboardKey)} 
                        />
                    ))}                    
                </div>
            ))}
        </div>
    )
}