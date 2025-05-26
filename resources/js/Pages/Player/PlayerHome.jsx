import VideoPlayer from "@/Components/VideoPlayer";
import PlayerLayout from "@/Layouts/PlayerLayout";

export default function PlayerHome({ video, userLiked }) {
    return (
        <PlayerLayout>
            <div className="flex justify-between">
                <VideoPlayer video={video} userLiked={userLiked} />
                <div className="w-1/3 bg-white"></div>
            </div>
        </PlayerLayout>
    );
}
