import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SwitchInput from "@/components/ui/form/SwitchInput";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { Settings } from "lucide-react";
import { useUserSettings } from "@/features/settings/user-settings-context";

export default function QuickSettings() {
    const { settings, setSettings } = useUserSettings();

    function toggleOnScreenKeyboard() {
        setSettings({
            ...settings,
            showOnScreenKeyboard: !settings.showOnScreenKeyboard
        });
    }

    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText 
                    text="Quick Settings"
                    Icon={Settings}
                />

                <div className="flex flex-col gap-4">
                    <SwitchInput label="On-screen keyboard" initialValue={settings.showOnScreenKeyboard} onChange={toggleOnScreenKeyboard} />
                    <SwitchInput label="Sound effects" />
                    <SwitchInput label="Prefill guess" />
                </div>
            </CardBody>
        </Card>
    )
}