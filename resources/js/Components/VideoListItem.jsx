import { Link } from "@inertiajs/react";
import { format, formatDistanceToNow } from "date-fns";

export default function VideoListItem({ video, isHistory, imgwidth }) {
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
            href={route("user.video.view", video.id)}
            className={`rounded-xl overflow-hidden flex shadow hover:shadow-md w-full my-2 mb-4 border bg-white cursor-pointer h-36 ${
                route().current("user.video.view", video.id)
                    ? "border-blue-500"
                    : ""
            }`}
        >
            <div
                className={`lg:flex flex ${
                    imgwidth ? "w-1/3" : " w-3/12"
                }   p-2  `}
            >
                <img
                    src={`/storage/${video.thumbnail_path}`}
                    className="rounded-xl object-cover w-full h-full"
                />
            </div>

            <div className="w-7/12 pl-3 p-3 text-text1 flex flex-col justify-center">
                <p className="text-base mb-2 font-bold ">{video.title}</p>
                <div className="text-xs text-primary mb-2">
                    <a className="flex items-center">
                        <span className="font-bold tracking-wide text-sm text-pink-400">
                            {video.view_count} views
                        </span>
                    </a>
                    {isHistory && (
                        <p className="text-green-800">
                            Watched at{" "}
                            {format(video.pivot.watched_at, "d-M-Y H:m")}
                        </p>
                    )}
                </div>
                <div className="text-sm text-text2 tracking-wider">
                    {formatDistanceToNow(video.created_at)} ago|{" "}
                    {formatSecondsToHMS(video.duration)}
                </div>
            </div>
        </Link>
    );
}
