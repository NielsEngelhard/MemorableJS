import Button from "@/components/ui/Button";
import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import TextInput from "@/components/ui/form/TextInput";
import TextWithIcon from "@/components/ui/text/TextWithIcon";
import { GAME_ID_LENGTH } from "@/features/game/util/game-id-generator";
import { GAME_ID_ALLOWED_CHARACTERS } from "@/features/game/util/game-id-generator"; // Import the allowed characters
import { JoystickIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { joinGameSchema, JoinGameSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { MP_LOBBY_ROUTE } from "@/lib/routes";

export default function JoinLobbyCard() {
    const form = useForm<JoinGameSchema>({
        resolver: zodResolver(joinGameSchema),
        mode: "onChange" // Enable validation on change
    });
    
    async function onSubmit(data: JoinGameSchema) {
        redirect(MP_LOBBY_ROUTE(data.joinCode));
    }
    
    // Handle input changes to enforce uppercase and allowed characters
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Filter out any characters not in the allowed set and convert to uppercase
        const filteredValue = value
            .split('')
            .filter(char => GAME_ID_ALLOWED_CHARACTERS.includes(char.toUpperCase()))
            .join('')
            .toUpperCase();
        
        // Set the filtered value
        form.setValue('joinCode', filteredValue, { shouldValidate: true });
    };
    
    return (
        <Card>
            <CardBody>
                <TextWithIcon Icon={JoystickIcon}>
                    Join with Code
                </TextWithIcon>     
                <p className="text-foreground-muted">Have a room code from a friend? Enter it below to join their lobby.</p>        
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <TextInput 
                        label="Join Code"
                        maxLength={GAME_ID_LENGTH}
                        {...form.register('joinCode')}
                        onChange={handleInputChange}
                        value={form.watch('joinCode') || ''}
                    />
                    <Button 
                        className="w-full" 
                        variant="secondary" 
                        disabled={!form.formState.isValid}
                        type="submit"
                    >
                        Join Game
                    </Button>                                  
                </form>        
            </CardBody>
        </Card>            
    )
}