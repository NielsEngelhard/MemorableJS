import Card from "@/components/ui/card/Card";
import { UserProfileModel } from "../../models"
import CardBody from "@/components/ui/card/CardBody";
import FeatureHighlight from "@/components/ui/FeatureHighlight";

interface Props {
    userProfile: UserProfileModel;
}

export default function OverallStatsTile({ userProfile }: Props) {
    return (
        <Card>
            <CardBody>
                <div className="grid grid-cols-2 gap-2">
                    <FeatureHighlight
                        title="127"
                        text="Total Games"
                    /> 
                    <FeatureHighlight
                        title="127"
                        text="Total Games"
                    /> 
                </div>

                <FeatureHighlight
                    title="127"
                    text="Total Games"
                />                
            </CardBody>
        </Card>
    )
}