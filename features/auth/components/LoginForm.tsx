import TextInput from "@/components/form/TextInput";
import Button from "@/components/ui/Button";
import { useAuth } from "../auth-context";
import { signInSchema, SignInSchema } from "../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/components/ui/text/ErrorText";

export default function LoginForm() {
    const { login } = useAuth();

        const form = useForm<SignInSchema>({
            resolver: zodResolver(signInSchema),
            defaultValues: {
                username: "",
                password: ""
            }
        })    

    async function onSubmit(data: SignInSchema) {
        var error = await login(data);

        form.setError("root", {
            type: "manual",
            message: error
        });        
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput label="Email/Username" placeholder="Your login name" {...form.register("username")} errorMsg={form.formState.errors.username?.message} required />

            <TextInput label="Password" placeholder="Enter your password" type="password" {...form.register("password")} errorMsg={form.formState.errors.password?.message} required />

            <Button>Sign In</Button>

            <ErrorText text={form.formState.errors.root?.message} />
        </form>
    )
}