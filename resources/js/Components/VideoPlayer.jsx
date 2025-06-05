import { Link, usePage } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useRef } from "react";
import CommentsSection from "./CommentsSection";
import DisLikeButton from "./DisLikeButton";
import LikeButton from "./LikeButton";

export default function VideoPlayer({ video, userLiked, userDisLiked }) {
    const videoRef = useRef(null);
    const { user } = usePage().props.auth;
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Important: Reload the video element
        }
    }, [video.file_path]);
    return (
        <div className="w-2/3">
            <video
                ref={videoRef}
                className=" h-96 mx-auto rounded-lg object-cover accent-blue-500"
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
                            <p className="text-sm text-gray-400">
                                {video.vid_channel.subscribers.length}{" "}
                                subscribers
                            </p>
                        </p>
                    </Link>

                    <div className="flex w-1/2 justify-between">
                        <div className="flex gap-10">
                            <LikeButton
                                videoId={video.id}
                                initialLiked={userLiked}
                                initialLikesCount={video.liked_by_users_count}
                            />
                            <DisLikeButton
                                videoId={video.id}
                                initialDisLiked={userDisLiked}
                                initialDisLikesCount={
                                    video.disliked_by_users_count
                                }
                            />
                        </div>

                        {video.vid_channel.user_id != user.id && (
                            <div className="flex items-center gap-2">
                                <Link
                                    preserveScroll
                                    method="POST"
                                    className=""
                                    href={route(
                                        "user.subscribe",
                                        video.vid_channel.id
                                    )}
                                >
                                    {video.vid_channel.subscribers.find(
                                        (susbs) => susbs.id == user.id
                                    ) ? (
                                        <p className="py-1 px-3 rounded-3xl bg-gray-400 text-white">
                                            UnSubscribe{" "}
                                        </p>
                                    ) : (
                                        <p className="py-1 px-3 rounded-3xl bg-black text-white">
                                            Subscribe{" "}
                                        </p>
                                    )}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {/* desc */}
                <div className="bg-gray-300 text-black rounded-md p-2">
                    <p className="text-sm text-black flex gap-3 items-center mb-2">
                        <span>{video.view_count} viwes</span>

                        <span>{formatDistanceToNow(video.created_at)} ago</span>
                    </p>
                    <p className="italic">{video.description}</p>
                    <p className="py-1 my-1 flex items-center gap-2">
                        {video.tags.map((el) => (
                            <p key={el}>#{el}</p>
                        ))}
                    </p>
                </div>
                <p className="my-5">{video.comments.length} Comments</p>
                <CommentsSection comments={video.comments} vid_id={video.id} />
            </div>
        </div>
    );
}
