import CHead from "@/Components/CHead";
import PlayListItem from "@/Components/PlayListItem";
import VideoPlayer from "@/Components/VideoPlayer";
import PlayerLayout from "@/Layouts/PlayerLayout";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function PlayListPlayer({
    video,
    playlist,
    videos,
    userLiked,
    userDisLiked,
    list_type,
    currentVideoIndex,
    currentVideo,
}) {
    console.log(playlist);
    const [currentVideoState, setCurrentVideoState] = useState(
        video || currentVideo
    );
    const [currentIndex, setCurrentIndex] = useState(currentVideoIndex || 0);

    useEffect(() => {
        if (playlist && videos && videos.length > 0) {
            setCurrentVideoState(videos[currentIndex]);
        } else if (video) {
            setCurrentVideoState(video);
        }
    }, [video, playlist, videos, currentIndex]);

    const handleNext = () => {
        if (playlist && videos && currentIndex < videos.length - 1) {
            setCurrentIndex(currentIndex + 1);
            router.get(
                route("play.playlist", playlist.id),
                { video: videos[currentIndex + 1].id, type: list_type },
                { preserveState: true }
            );
        }
    };

    const handlePrevious = () => {
        if (playlist && videos && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            router.get(
                route("play.playlist", playlist.id),
                { video: videos[currentIndex - 1].id, type: list_type },
                { preserveState: true }
            );
        }
    };

    const handlePlaylistItemClick = (index) => {
        if (playlist && videos) {
            setCurrentIndex(index);
            router.get(
                route("play.playlist", playlist.id),
                { video: videos[index].id, type: list_type },
                { preserveState: true }
            );
        }
    };
    console.log("vis here", videos[0].title);
    return (
        <PlayerLayout>
            <CHead title={videos[0].title} />
            <div className="flex mt-3">
                <VideoPlayer
                    video={currentVideo}
                    userLiked={userLiked}
                    userDisLiked={userDisLiked}
                />
                {playlist && videos && videos.length > 0 && (
                    <div className=" w-1/3 border rounded-xl">
                        <h1 className="text-center font-bold">
                            {playlist.name}
                        </h1>
                        <div className="flex justify-between items-center">
                            <button
                                className="text-black flex gap-1 items-center disabled:opacity-35"
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                            >
                                <FcPrevious />
                                Previous
                            </button>
                            <span>
                                {currentIndex + 1} / {videos.length}
                            </span>
                            <button
                                onClick={handleNext}
                                className="flex gap-1 items-center disabled:opacity-35"
                                disabled={currentIndex === videos.length - 1}
                            >
                                Next <FcNext />
                            </button>
                        </div>

                        <ul className="mt-5 w-full pr-2">
                            {videos.map((vid, index) => (
                                <li
                                    key={vid.id}
                                    onClick={() =>
                                        handlePlaylistItemClick(index)
                                    }
                                    className={`rounded-xl border cursor-pointer  my-2
                                   ${
                                       index === currentIndex
                                           ? "border border-blue-500"
                                           : ""
                                   }
                               `}
                                >
                                    <PlayListItem video={vid} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>{" "}
        </PlayerLayout>
    );
}
