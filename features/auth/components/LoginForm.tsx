import TextInput from "@/components/form/TextInput";
import Button from "@/components/ui/Button";

export default function LoginForm() {

    async function onSignIn() {
        
    }

    return (
        <form className="flex flex-col gap-3">
            <TextInput label="Email/Username" placeholder="Your login name" />

            <TextInput label="Password" placeholder="Enter your password" type="password" />

            <Button onClick={onSignIn}>Sign In</Button>
        </form>
    )
}