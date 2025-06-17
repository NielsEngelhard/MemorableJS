import TextInput from "@/components/form/TextInput";
import Button from "@/components/ui/Button";

export default function SignUpForm() {

    async function onSignUp() {
        
    }

    return (
        <form className="flex flex-col gap-3">
            <TextInput label="Username" placeholder="Your username" />

            <TextInput label="Email" placeholder="Your Email address" />

            <TextInput label="Password" placeholder="Enter your password" type="password" />

            <Button onClick={onSignUp}>Sign In</Button>
        </form>
    )
}