interface Props {
    letter: string;
    onClick: (key: string) => void;
}

export default function KeyboardKey({letter, onClick}: Props) {
    return (
        <div className="bg-[#F1F3F6] px-1.5 py-2 rounded-md lg:w-7 lg:h-10 flex items-center justify-center">
            {letter}
        </div>
    )
}