import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { format } from "date-fns";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AdminChannelDeletion from "./AdminChannelDeletion";

export default function AdminChannelView({ channel }) {
    console.log(channel);
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
        <AuthenticatedLayout>
            <div className="w-11/12 mx-auto my-2 p-2">
                <div className="my-2 flex justify-between gap-2 items-center">
                    <img
                        src={`/storage/${channel.logo}`}
                        className="object-cover w-32 h-32 rounded-full "
                    />
                    <div className="w-full">
                        <h1 className="font-bold text-xl">
                            {channel.channel_name}
                        </h1>
                        <p className="text-gray-400">
                            {channel.subscribers.length} Subscribers
                        </p>
                        <p className="text-gray-300">{channel.description}</p>
                    </div>
                    <div className="w-full flex justify-end">
                        <AdminChannelDeletion channel={channel} />
                    </div>
                </div>
                <div className="my-2 border-t-2 ">
                    {channel.videos.length == 0 ? (
                        <p className="my-2 text-2xl font-bold">
                            No Vidoes In This Channel{" "}
                        </p>
                    ) : (
                        <p>Videos</p>
                    )}

                    <div className="my-1">
                        {channel.videos.map((video) => {
                            return (
                                <div
                                    className="w-full my-2 bg-white"
                                    key={video.id}
                                >
                                    <div className="flex">
                                        {/* img */}
                                        <div className="relative w-40 h-32">
                                            <img
                                                src={`/storage/${video.thumbnail_path}`}
                                                className="rounded-xl object-cover w-full h-full"
                                            />
                                            <p className="absolute bottom-0 right-1 px-1 bg-black/60 text-white">
                                                {formatSecondsToHMS(
                                                    video.duration
                                                )}
                                            </p>
                                        </div>
                                        {/* rrest */}
                                        <div className="px-2 w-full">
                                            <h1>{video.title}</h1>
                                            <div className="my-2 w-full">
                                                <p className="flex items-center gap-2">
                                                    {" "}
                                                    {video.view_count}{" "}
                                                    <FaEye className="w-4 fill-current text-gray-900" />
                                                </p>
                                            </div>
                                            <div className="flex my-2 items-center ">
                                                <p className="flex gap-2 items-center rounded-xl p-1 px-2 border ">
                                                    {video.liked_by_users_count}{" "}
                                                    <AiFillLike className="w-4 fill-current text-gray-900" />{" "}
                                                </p>
                                                <p className="flex gap-2 items-center rounded-xl p-1 px-2 border">
                                                    {" "}
                                                    {
                                                        video.disliked_by_users_count
                                                    }{" "}
                                                    <AiFillDislike className="w-4 fill-current text-gray-900" />{" "}
                                                </p>
                                            </div>
                                            <div className=" w-full flex justify-end">
                                                <Link
                                                    href={route(
                                                        "admin.video.delete",
                                                        video.id
                                                    )}
                                                    method="DELETE"
                                                    className="text-white bg-red-500 px-4 rounded-lg py-1 flex items-center gap-2"
                                                >
                                                    Delete <MdDeleteForever />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
