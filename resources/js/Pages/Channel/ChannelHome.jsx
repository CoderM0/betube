import CHead from "@/Components/CHead";
import ViewChannel from "./ViewChannel";

export default function ChannelHome({ channel, video }) {
    return (
        <ViewChannel channel={channel}>
            <CHead title={`${channel.channel_name} - Home`} />
            <div className=" flex ">
                <div className="w-1/3 rounded-xl">
                    <video controls>
                        <source src={`/storage/${video.file_path}`} />
                    </video>
                </div>

                <div className="w-2/3 p-2">
                    <h1 className="text-xl font-bold">{video.title}</h1>
                    <p>{video.description}</p>
                </div>
            </div>
        </ViewChannel>
    );
}
