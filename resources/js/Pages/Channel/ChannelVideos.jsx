import CHead from "@/Components/CHead";
import VideoItem from "@/Components/VideoItem";
import ViewChannel from "./ViewChannel";

export default function ChannelVideos({ channel, videos }) {
    return (
        <ViewChannel channel={channel}>
            <CHead title={`${channel.channel_name} - Videos`} />

            <div className="flex flex-wrap gap-5 my-2">
                {videos.length == 0 ? (
                    <p>Novideos in this channel yet</p>
                ) : (
                    videos.map((vid) => {
                        return <VideoItem vid={vid} isOut={false} />;
                    })
                )}
            </div>
        </ViewChannel>
    );
}
