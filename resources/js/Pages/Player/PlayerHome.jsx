import VideoListItem from "@/Components/VideoListItem";
import VideoPlayer from "@/Components/VideoPlayer";
import PlayerLayout from "@/Layouts/PlayerLayout";

export default function PlayerHome({
    video,
    userLiked,
    userDisLiked,
    suggestions,
}) {
    return (
        <PlayerLayout>
            <div className="flex justify-between">
                <VideoPlayer
                    video={video}
                    userLiked={userLiked}
                    userDisLiked={userDisLiked}
                />
                <div className="w-1/3 bg-white">
                    {suggestions.map((sugvid) => {
                        return (
                            <VideoListItem
                                video={sugvid}
                                key={sugvid.id}
                                imgwidth={true}
                            />
                        );
                    })}
                </div>
            </div>
        </PlayerLayout>
    );
}
