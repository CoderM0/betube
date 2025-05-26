import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef } from "react";
import { BiDislike } from "react-icons/bi";
import { MdOutlineDataSaverOn } from "react-icons/md";
import CommentsSection from "./CommentsSection";
import LikeButton from "./LikeButton";

export default function VideoPlayer({ video, userLiked }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Important: Reload the video element
        }
    }, [video.file_path]);
    return (
        <div className="w-2/3">
            <video
                ref={videoRef}
                className=" h-96 mx-auto rounded-lg object-cover"
                controlsList="foobar"
                controls
                autoPlay
                width={"90%"}
            >
                <source
                    className="w-full"
                    src={`/storage/${video.file_path}`}
                ></source>
            </video>
            {/*  */}
            <div className="info w-[90%] mx-auto mt-3">
                <p className="font-bold text-xl">{video.title}</p>
                <div className="flex justify-between my-3">
                    <Link
                        className="flex gap-2"
                        href={route(
                            "channels.channel.home",
                            video.vid_channel.id
                        )}
                    >
                        <img
                            src={`/storage/${video.vid_channel?.logo}`}
                            alt=""
                            className="rounded-full w-10 h-10"
                        />
                        <p className="text-black italic font-bold ">
                            {video.vid_channel?.channel_name}{" "}
                        </p>
                    </Link>

                    <div className="flex w-1/2 justify-between">
                        {/* <button className="flex items-center gap-2 px-3 text-gray-800 hover:text-black rounded-2xl bg-gray-200 hover:bg-gray-300">
                                    Like <BiLike size={"1.2rem"} />
                                </button> */}
                        <LikeButton
                            videoId={video.id}
                            initialLiked={userLiked}
                            initialLikesCount={video.liked_by_users_count}
                        />
                        <button className="flex items-center gap-2 px-3 text-gray-800 hover:text-black rounded-2xl bg-gray-200 hover:bg-gray-300">
                            {" "}
                            DisLike <BiDislike size={"1.2rem"} />
                        </button>
                        <button className="flex items-center gap-2 px-3 text-gray-800 hover:text-black rounded-2xl bg-gray-200 hover:bg-gray-300">
                            Save <MdOutlineDataSaverOn size={"1.2rem"} />
                        </button>
                    </div>
                </div>
                {/* desc */}
                <div className="bg-gray-300 text-black rounded-md p-2">
                    <p className="text-sm text-black flex gap-3 items-center mb-2">
                        <span>{video.view_count} viwes</span>

                        <span>{formatDistanceToNow(video.created_at)} ago</span>
                    </p>
                    <p className="italic">{video.description}</p>
                </div>
                <p className="my-5">{video.comments.length} Comments</p>
                <CommentsSection comments={video.comments} vid_id={video.id} />
            </div>
        </div>
    );
}
