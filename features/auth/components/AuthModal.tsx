"use client"

import Modal from "@/components/ui/Modal";
import { useAuth } from "../auth-context";
import LoginForm from "./LoginForm";
import TabSwitch, { Tab } from "@/components/ui/TabSwitch";
import FadedText from "@/components/ui/text/FadedText";
import { APP_NAME } from "@/lib/global-constants";

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

    return (
        <Modal isVisible={showAuthModal} onClose={toggleShowAuthModal}>
            
            <div className="font-bold text-xl text-center">
                <FadedText>Welcome to {APP_NAME}</FadedText>
            </div>

            <TabSwitch tabs={tabs}>

            </TabSwitch>
            
            <div>
                <LoginForm></LoginForm>
            </div>
        </Modal>
    )
}