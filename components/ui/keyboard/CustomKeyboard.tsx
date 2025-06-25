import KeyboardKey from "./KeyboardKey";

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

export default function CustomKeyboard() {
    function onKeyClick(key: string) {

    }

    return (
        <div className="flex flex-col gap-1.5 lg:gap-2.5 items-center">
            {keyboardRows.map((keyboardRow, index) => (
                <div className="flex flex-row gap-1.5 lg:gap-2.5">
                    {keyboardRow.map((keyboardKey, index) => (
                        <KeyboardKey letter={keyboardKey} onClick={onKeyClick} />
                    ))}                    
                </div>
            ))}
        </div>
    )
}