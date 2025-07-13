import { Delete, Send } from "lucide-react";
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
    onDelete?: () => void;
    onEnter?: () => void;
}

export default function CustomKeyboard({ correctKeys, warningKeys, errorKeys, onKeyPress, onDelete, onEnter }: Props) {
    function determineKeyVariant(keyboardKey: string): "neutral" | "success" | "warning" | "error" | null | undefined {
        if (warningKeys?.includes(keyboardKey.toUpperCase())) return "warning";
        if (correctKeys?.includes(keyboardKey.toUpperCase())) return "success";        
        if (errorKeys?.includes(keyboardKey.toUpperCase())) return "error";

        return "neutral";
    }

    return (
        <div className="flex flex-col gap-1.5 lg:gap-2.5 items-center w-full">
            {keyboardRows.map((keyboardRow, rowIndex) => (
                <div className="flex flex-row gap-1.5 lg:gap-2.5" key={`kb-row-${rowIndex}`}>

                    {/* ENTER Key - positioned at the beginning of the bottom row */}
                    {onEnter && rowIndex === keyboardRows.length - 1 && (
                        <KeyboardKey
                        
                            key="kb-key-enter"
                            variant="primary"
                            fixedWidth={false}
                            onClick={onEnter}
                        >
                            <div className="px-2 text-xs font-bold">ENTER</div>
                        </KeyboardKey>
                    )}

                    {/* Letters */}
                    {keyboardRow.map((keyboardKey, index) => (
                        <KeyboardKey
                            key={`kb-key-${index}`}
                            onClick={() => onKeyPress(keyboardKey)}
                            variant={determineKeyVariant(keyboardKey)}>           
                            <>{keyboardKey}</>
                        </KeyboardKey>             
                    ))}     

                    {/* Delete Key - positioned at the end of the bottom row */}
                    {onDelete && rowIndex === keyboardRows.length - 1 && (
                        <KeyboardKey
                            key="kb-key-delete"
                            variant="neutral"
                            fixedWidth={false}
                            onClick={onDelete}
                        >
                            <div className="px-2">
                                <Delete size={18} />
                            </div>
                        </KeyboardKey>
                    )}                     
                </div>
            ))}
        </div>
    )
}