import { Link, usePage } from "@inertiajs/react";
import { format, formatDistanceToNow } from "date-fns";
import { MdOutlineWatchLater } from "react-icons/md";
export default function VideoItem({ vid, isOut }) {
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
        <Link
            href={route("user.video.view", vid.id)}
            className="w-[32%] block max-h-64  p-1 pb-2"
            key={vid.id}
        >
            <div className="flex w-full">
                <div className="my-1 shadow border border-gary-300 rounded-lg w-full">
                    <div className="relative h-40 ">
                        <img
                            src={`/storage/${vid.thumbnail_path}`}
                            alt=""
                            className="rounded-lg w-full border h-full object-cover peer"
                        />
                        <p className="absolute top-0 right-0 bg-black/60 hidden rounded-lg text-white  peer-hover:block">
                            {" "}
                            <Link
                                method="POST"
                                href={route("user.video.watchlater", vid.id)}
                            >
                                {vid.watch_later_by_users.find((el) => {
                                    return el.id == user.id;
                                }) ? (
                                    <p className="flex items-center gap-1">
                                        {" "}
                                        <MdOutlineWatchLater /> remove from
                                        watch later
                                    </p>
                                ) : (
                                    <p className="flex items-center gap-1">
                                        {" "}
                                        <MdOutlineWatchLater /> watch later
                                    </p>
                                )}
                            </Link>
                        </p>
                        <p className="absolute bottom-0 right-1 px-1 bg-black/60 text-white">
                            {formatSecondsToHMS(vid.duration)}
                        </p>
                    </div>
                    {!isOut ? (
                        <p className="font-bold">{vid.title.slice(0, 50)}</p>
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
                                <p className="font-bold">
                                    {vid.title.slice(0, 50)}
                                </p>
                            </div>

                            <p className="text-gray-600 italic ml-9">
                                {vid.vid_channel?.channel_name}{" "}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="text-sm text-gray-400 flex gap-1 items-center mb-2 px-2">
                        <p>{vid.view_count} viwes</p>
                        <p className="text-xl font-bold">.</p>
                        <p>{formatDistanceToNow(vid.created_at)} ago</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
