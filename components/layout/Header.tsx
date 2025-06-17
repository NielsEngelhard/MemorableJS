import { APP_NAME } from "@/lib/global-constants";
import Button from "../ui/Button";
import FadedText from "../ui/text/FadedText";

export default function Header() {
    return (
        <header className="h-[65px] bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 flex justify-center w-full">
            <div className="max-w-7xl flex justify-between w-full items-center">
                {/* Left */}
                <div className="text-2xl font-bold">
                    <FadedText>
                        <a href="/">
                        {APP_NAME}
                        </a>
                    </FadedText>
                </div>

                {/* Right */}
                <div>
                    <Button>Sign In</Button>
                </div>
            </div>
        </header>
    )
}