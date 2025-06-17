"use client"

import Modal from "@/components/ui/Modal";
import { useAuth } from "../auth-context";

export default function AuthModal() {
    const { showAuthModal } = useAuth();

    return (
        <Modal isVisible={showAuthModal}>
            <div>
                lollol
            </div>
        </Modal>
    )
}