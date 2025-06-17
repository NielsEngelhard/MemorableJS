import FadedText from "@/components/ui/text/FadedText";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="font-bold text-4xl">
                <FadedText>404 NOT FOUND</FadedText>
            </div>
            <p>This page does not exist...</p>
        </div>
    )
}