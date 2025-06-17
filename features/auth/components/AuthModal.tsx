"use client"

import Modal from "@/components/ui/Modal";
import { useAuth } from "../auth-context";

export default function AuthModal() {
    const { showAuthModal, toggleShowAuthModal } = useAuth();

    return (
        <Modal isVisible={showAuthModal} onClose={toggleShowAuthModal}>
            <div>
                lollol
            </div>
        </Modal>
    )
}