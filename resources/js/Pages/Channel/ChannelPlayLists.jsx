import CHead from "@/Components/CHead";
import PlayListCard from "@/Components/PlayListCard";
import ViewChannel from "./ViewChannel";

export default function ChannelPlayLists({ channel, playlists }) {
    console.log(playlists);
    return (
        <ViewChannel channel={channel}>
            <CHead title={`${channel.channel_name} - playlists`} />

            <div className="flex flex-wrap gap-5 mt-5">
                {playlists.map((playlist) => {
                    return <PlayListCard playlist={playlist} />;
                })}
            </div>
        </ViewChannel>
    );
}
