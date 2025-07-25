import Button from "@/components/ui/Button";
import { UserProfileModel } from "../models";
import OverallStatsTile from "./ProfileTiles/OverallStatsTile";
import RecentGamesTile from "./ProfileTiles/RecentGamesTile";
import UserTile from "./ProfileTiles/UserTile";
import WordOfTheDayStatsTile from "./ProfileTiles/WordOfTheDayStatsTile";
import { useAuth } from "@/features/auth/auth-context";

interface Props {
    userProfile: UserProfileModel;
}

export default function UserProfile({ userProfile }: Props) {
    const { logout } = useAuth();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <div></div>
                <div>
                    <Button variant="error" onClick={logout}>Logout</Button>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4">
                {/* Left */}
                <div className="col-span-1 w-full flex flex-col gap-2 sm:gap-4">
                    <UserTile userProfile={userProfile} />
                    <OverallStatsTile userProfile={userProfile} />
                    <WordOfTheDayStatsTile userProfile={userProfile} />
                </div>

                {/* Right */}
                <div className="col-span-1 sm:col-span-2 w-full">
                    <RecentGamesTile userProfile={userProfile} />
                </div>
            </div>
        </div>
    )
}