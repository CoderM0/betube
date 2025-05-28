import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import VideoListItem from "@/Components/VideoListItem";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function EditPlayList({ videos, playlist }) {
    const { data, setData, put } = useForm({
        videos: [],
        name: playlist.name,
    });
    const [tmpvids, setTmpvids] = useState(playlist.videos.map((el) => el.id));
    const store_playlist = (e) => {
        e.preventDefault();

        put(route("user.playlist.update", playlist.id));
    };
    let tmp = [];
    const managevids = (element) => {
        if (element.checked) {
            setTmpvids((prev) => [...prev, element.value]);
        } else {
            tmp = tmpvids.filter((el) => el != element.value);
            setTmpvids(tmp);
        }
    };
    useEffect(() => {
        setData(`videos`, tmpvids);
    }, [tmpvids]);
    return (
        <AuthLayout>
            <form onSubmit={store_playlist}>
                <InputLabel className="my-3">PlayList Name</InputLabel>
                <TextInput
                    type="text"
                    value={data.name}
                    className="w-full my-2"
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputLabel className="my-3">Add Videos to playlist</InputLabel>
                <div className="my-3">
                    {videos.map((video) => {
                        return (
                            <div
                                key={video.id}
                                className="flex items-center gap-3"
                            >
                                <input
                                    type="checkbox"
                                    name="vid"
                                    id=""
                                    defaultChecked={
                                        video.play_list_id == playlist.id
                                    }
                                    value={video.id}
                                    onChange={(e) => managevids(e.target)}
                                />
                                <VideoListItem
                                    video={video}
                                    isHistory={false}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center">
                    <PrimaryButton className="w-1/2 my-4 block mx-auto justify-center">
                        Update
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
