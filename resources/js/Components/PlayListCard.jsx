import { Link, usePage } from "@inertiajs/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever, MdEdit, MdPlaylistPlay } from "react-icons/md";
import DropUp from "./DropUp";

export default function PlayListCard({ playlist, isOwner }) {
    const { user } = usePage().props.auth;
    console.log(playlist);
    return (
        <div className="border rounded-xl shadow">
            <Link
                href={route("play.playlist", playlist.id)}
                data={{ type: "playlist" }}
                className="relative"
            >
                <img
                    class="mb-1 rounded-xl w-60 h-48"
                    src={`/storage/${playlist.videos[0].thumbnail_path}`}
                />
                <p className="absolute px-2 text-sm bg-black/50 rounded-xl flex items-center gap-1 text-white bottom-0 right-0">
                    {" "}
                    <MdPlaylistPlay /> {playlist.videos.length} Videos
                </p>
            </Link>

            <div className="flex justify-between items-center px-2">
                <h3 class="text-[#0A2025] text-center  py-1 font-bold font-['Roboto']">
                    {playlist.name}
                </h3>
                <DropUp
                    trigger={<BsThreeDotsVertical className="cursor-pointer" />}
                    content={
                        <div>
                            {isOwner ? (
                                <div className="py-2">
                                    <Link
                                        href={route("user.playlist.edit", [
                                            playlist.id,
                                        ])}
                                        className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-md"
                                    >
                                        <MdEdit />
                                        <span>Edit </span>
                                    </Link>
                                    <Link
                                        href={route(
                                            "user.playlist.delete",
                                            playlist.id
                                        )}
                                        method="DELETE"
                                        preserveScroll
                                        className="flex w-full items-center gap-2  px-4 py-2 text-red-800 hover:bg-gray-200 rounded-md"
                                    >
                                        <MdDeleteForever />
                                        <span> Delete</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="py-2">
                                    <Link
                                        href={route(
                                            "user.save_to_playlists",
                                            playlist.id
                                        )}
                                        method="POST"
                                        className="block w-full px-2 py-1 text-gray-800 hover:bg-gray-200 rounded-md"
                                    >
                                        {playlist.saved_by_users.find(
                                            (el) => el.id == user.id
                                        )
                                            ? "remove From Saved PlayLists"
                                            : "save to playlists"}
                                    </Link>
                                </div>
                            )}
                        </div>
                    }
                    openUpward={true} // Set to true to open upwards
                />
            </div>
        </div>
    );
}
