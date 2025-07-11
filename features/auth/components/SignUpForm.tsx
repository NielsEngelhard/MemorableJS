import TextInput from "@/components/ui/form/TextInput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { SignUpSchema, signUpSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/components/ui/text/ErrorText";
import { signIn, signUp } from "../actions";
import { redirect } from "next/navigation";
import { useAuth } from "../auth-context";

export default function SignUpForm() {
    const { toggleShowAuthModal, login } = useAuth();

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(data: SignUpSchema) {
        const error = await signUp(data);
        if (!error) {
            await login({ username: data.email, password: data.password });
            toggleShowAuthModal();
            redirect("/play");
        } 

        form.setError("root", {
            type: "manual",
            message: error
        });
    }
    
    return (
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput label="Email" placeholder="Your Email address" {...form.register("email")} errorMsg={form.formState.errors.email?.message} required />

            <TextInput label="Password" placeholder="Enter your password" type="password" {...form.register("password")} errorMsg={form.formState.errors.password?.message} required />

            <TextInput label="Username" placeholder="Your username" {...form.register("username")} errorMsg={form.formState.errors.username?.message} />

            <Button type="submit">Sign Up</Button>

            <ErrorText text={form.formState.errors.root?.message} />
        </form>
    )
}