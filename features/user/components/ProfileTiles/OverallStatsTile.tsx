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
                        variant="primary" 
                        title="127"
                        text="Total Games"
                    /> 
                    <FeatureHighlight
                        variant="secondary" 
                        title="127"
                        text="Highest Score"
                    /> 
                </div>

                <FeatureHighlight
                    variant="success"            
                    title="88%"
                    text="Win Rate"
                />                
            </CardBody>
        </Card>
    )
}