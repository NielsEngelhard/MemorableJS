"use client"

import { APP_NAME } from "@/lib/global-constants";
import Button from "../ui/Button";
import FadedText from "../ui/text/FadedText";
import { useAuth } from "@/features/auth/auth-context";
import { Calendar, Play, Sparkle, Sparkles, User } from "lucide-react";
import Link from "next/link";
import Badge from "../ui/Badge";

export default function Header() {
    const { user, toggleShowAuthModal } = useAuth();    

    return (
        <header className="h-[65px] bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 flex justify-center w-full px-6">
            <div className="max-w-7xl flex justify-between w-full items-center">
                {/* Left */}
                <div className="flex flex-row gap-2">
                    <div className="text-2xl font-bold">
                        <FadedText>
                            <a href="/">
                                {APP_NAME}
                            </a>
                        </FadedText>                        
                    </div>
                    
                    {user && (
                        <Badge variant="accent">
                            <Calendar size={12} />
                            WoD available!
                            <Sparkles size={12} />
                        </Badge>
                    )}                    
                </div>

                {/* Right */}
                {user ? (
                    <div className="gap-2 hidden lg:flex">
                            <Link href="/play">
                                <Button variant="fade">
                                    <div className="flex gap-1 items-center"><Play size={16} />Play</div>
                                </Button>                               
                            </Link>                         
                                               
                        <Link href="/account">
                            <Button variant="skeleton">
                                <div className="flex gap-1 items-center"><User size={16} />{user.username}</div>
                            </Button>                        
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Button onClick={toggleShowAuthModal}>Sign In</Button>
                    </div>
                )}

            </div>
        </header>
    )
}