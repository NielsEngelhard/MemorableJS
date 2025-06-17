import { X } from "lucide-react";

interface Props {
    isVisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ isVisible, children, onClose }: Props) {
    return (
        isVisible &&
            // Background
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/75 z-50">
                
                {/* Card */}
                <div className="flex items-center justify-center h-full">
                    <div className="relative p-6 rounded-lg bg-background w-fit lg:min-w-[400px]">
                        {children}       

                        {/* Close icon */}
                        <div className="absolute top-2 right-2 text-foreground-muted">
                            <button className="cursor-pointer" onClick={onClose}>
                                <X size={16} />
                            </button>
                        </div>                                     
                    </div>               
                </div>
            </div>
    )
}