import Card from "@/components/ui/card/Card";
import CardBody from "@/components/ui/card/CardBody";
import SwitchInput from "@/components/ui/form/SwitchInput";
import SubTitleText from "@/components/ui/text/SubTitleText";
import { Settings } from "lucide-react";
import { useUserSettings } from "@/features/settings/user-settings-context";

export default function QuickSettings() {
    const { settings, toggleSetting } = useUserSettings();

    return (
        <Card>
            <CardBody className="p-2 lg:p-6">
                <SubTitleText 
                    text="Quick Settings"
                    Icon={Settings}
                />

                <div className="flex flex-col gap-4">
                    <SwitchInput label="On-screen keyboard" initialValue={settings.showOnScreenKeyboard} onChange={() => toggleSetting("showOnScreenKeyboard")} />
                    <SwitchInput label="Sound effects" initialValue={settings.playSoundEffects} onChange={() => toggleSetting("playSoundEffects")} />
                    <SwitchInput label="Prefill guess" initialValue={settings.preFillWord} onChange={() => toggleSetting("preFillWord")} />
                </div>
            </CardBody>
        </Card>
    )
}