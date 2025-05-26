import { format, formatDistanceToNow } from "date-fns";

export default function PlayListItem({ video }) {
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
        <div
            className={`rounded-xl overflow-hidden flex shadow hover:shadow-md w-full  border bg-white cursor-pointer h-28 `}
        >
            <div className={`lg:flex flex w-1/3 h-28   relative `}>
                <img
                    src={`/storage/${video.thumbnail_path}`}
                    className="rounded-lg object-cover w-full h-full"
                />
                <p className="absolute bottom-0 right-0 text-white bg-black/50">
                    {" "}
                    {formatSecondsToHMS(video.duration)}
                </p>
            </div>

            <div className="w-7/12 pl-3 p-3 text-text1 flex flex-col justify-center">
                <p className="text-base mb-2 font-bold ">{video.title}</p>
                <div className="text-xs text-primary mb-2">
                    <a className="flex items-center">
                        <span className="font-bold tracking-wide text-sm text-pink-400">
                            {video.view_count} views
                        </span>
                    </a>
                </div>
                <div className="text-sm text-text2 tracking-wider">
                    {formatDistanceToNow(video.created_at)}
                </div>
            </div>
        </div>
    );
}
