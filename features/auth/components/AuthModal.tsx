"use client"

import Modal from "@/components/ui/Modal";
import { useAuth } from "../auth-context";
import LoginForm from "./LoginForm";

export default function AuthModal() {
    const { showAuthModal, toggleShowAuthModal } = useAuth();

    return (
        <Modal isVisible={showAuthModal} onClose={toggleShowAuthModal}>
            <div>
                <LoginForm></LoginForm>
            </div>
        </Modal>
    )
}