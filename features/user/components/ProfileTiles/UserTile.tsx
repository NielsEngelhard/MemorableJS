import Card from "@/components/ui/card/Card";
import { UserProfileModel } from "../../models"
import CardBody from "@/components/ui/card/CardBody";
import { formatDateToDayMonthNameYear } from "@/lib/string-util";
import { Heart, Shield } from "lucide-react";
import { getLevelTitle } from "../../user-level";

interface Props {
    userProfile: UserProfileModel;
}

export default function UserTile({ userProfile }: Props) {
    return (
        <Card variant="fade">
            <CardBody className="flex flex-col items-center justify-center">
                
                {/* Picture */}
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-primary" style={userProfile.user.colorHex ?{ backgroundColor: userProfile.user.colorHex } : {}}>
                </div>

                {/* username */}
                <div className="font-bold text-2xl">
                    {userProfile.user.username}
                </div>

                {/* Rank */}
                <div className="flex items-center text-primary">
                    <Shield size={18} />
                    {getLevelTitle(userProfile.user.level)}
                    <span className="px-1">•</span>
                    <span className="text-foreground-muted">level {userProfile.user.level}</span>
                </div>

                {/* Member since */}
                {userProfile.user.createdAt && (
                    <div className="text-xs text-foreground-muted">
                        Member since {formatDateToDayMonthNameYear(userProfile.user.createdAt)}
                    </div>
                )}

                {userProfile.user.favoriteWord && (
                    <div className=" flex flex-col w-full rounded-md bg-background">
                        <div className="flex items-center gap-1.5 text-error justify-center"><Heart size={14} /> Favorite Word</div>
                        <div className="text-center font-semibold">{userProfile.user.favoriteWord?.toUpperCase()}</div>
                    </div>          
                )}
                
            </CardBody>
        </Card>
    )
}