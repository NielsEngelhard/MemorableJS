"use client"
import { useParams } from "next/navigation";

export default function PlayLetterLeagueGame() {
    const params = useParams();
    const slug = params.slug;
    
    return (
        <div>
            hello {slug}
        </div>
    )
}