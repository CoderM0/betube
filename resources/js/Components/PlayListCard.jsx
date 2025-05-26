import { Link } from "@inertiajs/react";
import { MdPlaylistPlay } from "react-icons/md";

export default function PlayListCard({ playlist }) {
    return (
        <Link
            href={route("play.playlist", playlist.id)}
            data={{ type: "playlist" }}
            className="border rounded-xl shadow"
        >
            <div className="relative">
                <img
                    class="mb-1 rounded-xl w-60 h-48"
                    src={`/storage/${playlist.videos[0].thumbnail_path}`}
                />
                <p className="absolute px-2 text-sm bg-black/50 rounded-xl flex items-center gap-1 text-white bottom-0 right-0">
                    {" "}
                    <MdPlaylistPlay /> {playlist.videos.length} Videos
                </p>
            </div>

            <div>
                <h3 class="text-[#0A2025] text-center  py-1 font-bold font-['Roboto']">
                    {playlist.name}
                </h3>
            </div>
        </Link>
    );
}
