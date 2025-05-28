import { Link, usePage } from "@inertiajs/react";
import { format, formatDistanceToNow } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever, MdEdit, MdOutlineWatchLater } from "react-icons/md";
import DropUp from "./DropUp";
export default function VideoItem({ vid, isOut, isOwner }) {
    const { user } = usePage().props.auth;
    console.log(vid.watch_later_by_users.includes(user));
    const formatSecondsToHMS = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const duration = new Date(0, 0, 0, hours, minutes, seconds);
        if (hours == 0) {
            return format(duration, "mm:ss");
        } else {
            return format(duration, "H:mm:ss");
        }
    };

    return (
        <div className="w-[32%] block max-h-64  p-1 pb-2" key={vid.id}>
            <div className="flex w-full">
                <div className="my-1 shadow border border-gary-300 rounded-lg w-full">
                    <Link
                        href={route("user.video.view", vid.id)}
                        className="block h-40 "
                    >
                        <div className="relative h-40 select-none">
                            <img
                                src={`/storage/${vid.thumbnail_path}`}
                                alt=""
                                className="rounded-lg w-full border h-full object-cover peer"
                            />

                            <p className="absolute bottom-0 right-1 px-1 bg-black/60 text-white">
                                {formatSecondsToHMS(vid.duration)}
                            </p>
                        </div>
                    </Link>
                    {!isOut ? (
                        <p className="font-bold w-full flex justify-between px-2 items-center py-2">
                            {vid.title.slice(0, 50)}{" "}
                            <DropUp
                                trigger={
                                    <BsThreeDotsVertical className="cursor-pointer" />
                                }
                                content={
                                    <div className="select-none">
                                        {isOwner ? (
                                            <div className="py-2">
                                                <a
                                                    href={route(
                                                        "user.videos.edit",
                                                        vid.id
                                                    )}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                                                >
                                                    <MdEdit />
                                                    <span>Edit </span>
                                                </a>
                                                <Link
                                                    href={route(
                                                        "user.videos.delete",
                                                        vid.id
                                                    )}
                                                    method="DELETE"
                                                    preserveScroll
                                                    className="flex w-full items-center gap-2 px-4 py-2 text-red-800 hover:bg-gray-200 rounded-md"
                                                >
                                                    <MdDeleteForever />
                                                    <span> Delete</span>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="py-2">
                                                <Link
                                                    method="POST"
                                                    href={route(
                                                        "user.video.watchlater",
                                                        vid.id
                                                    )}
                                                >
                                                    {vid.watch_later_by_users.find(
                                                        (el) => {
                                                            return (
                                                                el.id == user.id
                                                            );
                                                        }
                                                    ) ? (
                                                        <p className="flex items-center gap-1">
                                                            {" "}
                                                            <MdOutlineWatchLater />{" "}
                                                            remove from watch
                                                            later
                                                        </p>
                                                    ) : (
                                                        <p className="flex items-center gap-1">
                                                            {" "}
                                                            <MdOutlineWatchLater />{" "}
                                                            watch later
                                                        </p>
                                                    )}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                }
                                openUpward={true} // Set to true to open upwards
                            />
                        </p>
                    ) : (
                        ""
                    )}

                    {isOut ? (
                        <div className="my-2">
                            <div className="text-black font-bold flex gap-2 items-center">
                                <img
                                    src={`/storage/${vid.vid_channel?.logo}`}
                                    alt=""
                                    className="rounded-full w-8 h-8"
                                />
                                <p className="font-bold w-full flex justify-between px-2 items-center ">
                                    {vid.title.slice(0, 50)}{" "}
                                    <DropUp
                                        trigger={
                                            <BsThreeDotsVertical className="cursor-pointer" />
                                        }
                                        content={
                                            <div>
                                                <div className="py-2">
                                                    <Link
                                                        method="POST"
                                                        href={route(
                                                            "user.video.watchlater",
                                                            vid.id
                                                        )}
                                                    >
                                                        {vid.watch_later_by_users.find(
                                                            (el) => {
                                                                return (
                                                                    el.id ==
                                                                    user.id
                                                                );
                                                            }
                                                        ) ? (
                                                            <p className="flex items-center gap-1 text-red-500 px-2">
                                                                {" "}
                                                                <MdOutlineWatchLater />{" "}
                                                                remove from
                                                                watch later
                                                            </p>
                                                        ) : (
                                                            <p className="flex items-center gap-1 px-2">
                                                                {" "}
                                                                <MdOutlineWatchLater />{" "}
                                                                watch later
                                                            </p>
                                                        )}
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                        openUpward={true} // Set to true to open upwards
                                    />
                                </p>
                            </div>

                            <Link
                                href={route(
                                    "channels.channel.home",
                                    vid.vid_channel?.id
                                )}
                                className="text-gray-600 italic ml-9"
                            >
                                {vid.vid_channel?.channel_name}{" "}
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="text-sm text-gray-400 flex gap-1 items-center mb-2 px-2 select-none">
                        <p>{vid.view_count} viwes</p>
                        <p className="text-xl font-bold">.</p>
                        <p>{formatDistanceToNow(vid.created_at)} ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
