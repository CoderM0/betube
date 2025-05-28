import VideoItem from "@/Components/VideoItem";
import { Link } from "@inertiajs/react";
import { CiSquarePlus } from "react-icons/ci";
import MyChannelView from "./MyChannelView";

export default function ManageVideos({ videos, channel }) {
    return (
        <MyChannelView channel={channel}>
            <div className=" my-2">
                {videos.length == 0 ? (
                    <p>
                        No videos in your channel yet !.{" "}
                        <Link
                            href={route("user.videos.upload")}
                            className="underline text-blue-600"
                        >
                            Upload your first video here
                        </Link>{" "}
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-5 my-2 items-center">
                        <Link
                            href={route("user.videos.upload")}
                            className="w-[32%]  h-56  rounded-xl bg-gray-200 font-bold flex gap-2 items-center justify-center"
                        >
                            Upload new Video <CiSquarePlus size={"1.5rem"} />
                        </Link>
                        {videos.map((vid) => {
                            return (
                                <VideoItem
                                    vid={vid}
                                    isOwner={true}
                                    isOut={false}
                                    key={vid.id}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </MyChannelView>
    );
}
