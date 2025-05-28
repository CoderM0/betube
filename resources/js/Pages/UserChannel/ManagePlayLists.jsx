import PlayListCard from "@/Components/PlayListCard";
import { Link } from "@inertiajs/react";
import { CiSquarePlus } from "react-icons/ci";
import MyChannelView from "./MyChannelView";

export default function ManagePlayLists({ channel, playlists }) {
    return (
        <MyChannelView channel={channel}>
            <div className="flex flex-wrap gap-5 mt-5">
                <Link
                    href={route("user.playlists.create")}
                    className="w-60 h-56 rounded-xl flex justify-center items-center gap-2 bg-gray-300"
                >
                    Add PlayList <CiSquarePlus size={"1.5rem"} />
                </Link>
                {playlists.map((playlist) => {
                    return (
                        <PlayListCard
                            playlist={playlist}
                            isOwner={true}
                            key={playlist.id}
                        />
                    );
                })}
            </div>
        </MyChannelView>
    );
}
