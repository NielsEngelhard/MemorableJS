"use client"

import Modal from "@/components/ui/Modal";
import { useAuth } from "../auth-context";
import LoginForm from "./LoginForm";
import TabSwitch, { Tab } from "@/components/ui/TabSwitch";
import FadedText from "@/components/ui/text/FadedText";
import { APP_NAME } from "@/lib/global-constants";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

const tabs: Tab[] = [
    {
        index: 0,
        label: "Sign In",
    },
    {
        index: 1,
        label: "Sign Up",
    }    
]

export default function AuthModal() {
    const { showAuthModal, toggleShowAuthModal } = useAuth();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <Modal isVisible={showAuthModal} onClose={toggleShowAuthModal}>
            <div className="flex flex-col gap-3">
                <div className="font-bold text-xl text-center">
                    <FadedText>Welcome to {APP_NAME}</FadedText>
                </div>

                <TabSwitch tabs={tabs} activeTabIndex={activeTabIndex} onTabChange={(index) => setActiveTabIndex(index)} />
                
                {activeTabIndex == 0 &&
                    <LoginForm></LoginForm>
                }

                {activeTabIndex == 1 &&
                    <SignUpForm></SignUpForm>
                }
            </div>
        </Modal>
    )
}