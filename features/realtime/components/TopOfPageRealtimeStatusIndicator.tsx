import { useState } from "react";
import { Wifi, WifiOff, RotateCcw } from "lucide-react";

interface Props {
    isConnected: boolean;
    onReconnect?: () => void;
}

export default function TopOfPageRealtimeStatusIndicator({ 
    isConnected, 
    onReconnect 
}: Props) {
    const [isReconnecting, setIsReconnecting] = useState(false);

    const handleReconnect = async () => {
        if (onReconnect && !isConnected && !isReconnecting) {
            setIsReconnecting(true);
            try {
                await onReconnect();
            } finally {
                setTimeout(() => setIsReconnecting(false), 1500);
            }
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100] group">
            <div 
                className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-full 
                    backdrop-blur-md shadow-lg border transition-all duration-500 ease-out
                    cursor-pointer hover:scale-105 active:scale-95
                    ${isConnected 
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/90 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300' 
                        : 'bg-rose-50/90 dark:bg-rose-950/90 border-rose-200/50 dark:border-rose-800/50 text-rose-700 dark:text-rose-300'
                    }
                    ${!isConnected && !isReconnecting ? 'hover:bg-rose-100/90 dark:hover:bg-rose-900/90' : ''}
                `}
                onClick={handleReconnect}
            >
                {/* Pulse ring for connected state */}
                {isConnected && (
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                )}

                {/* Status Icon */}
                <div className="relative z-10">
                    {isReconnecting ? (
                        <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : isConnected ? (
                        <Wifi className="w-4 h-4" />
                    ) : (
                        <WifiOff className="w-4 h-4" />
                    )}
                </div>

                {/* Status Text */}
                <span className="text-sm font-medium tracking-wide">
                    {isReconnecting 
                        ? 'Reconnecting' 
                        : isConnected 
                            ? 'Live' 
                            : 'Offline'
                    }
                </span>

                {/* Status Dot */}
                <div className="relative">
                    <div className={`
                        w-2.5 h-2.5 rounded-full transition-all duration-300
                        ${isConnected 
                            ? 'bg-emerald-500 shadow-emerald-500/50 shadow-md' 
                            : 'bg-rose-500 shadow-rose-500/50 shadow-md'
                        }
                    `} />
                    {isConnected && (
                        <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse opacity-40" />
                    )}
                </div>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {isConnected 
                        ? 'Real-time connection active' 
                        : isReconnecting 
                            ? 'Attempting to reconnect...'
                            : 'Click to reconnect'
                    }
                </div>
            </div>
        </div>
    );
}