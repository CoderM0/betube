import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import VideoListItem from "@/Components/VideoListItem";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreatePlayList({ videos }) {
    const { data, setData, post } = useForm({ videos: [] });
    const [tmpvids, setTmpvids] = useState([]);
    const store_playlist = (e) => {
        e.preventDefault();

        console.log(data);
        post(route("user.playlist.store"));
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
                    className="w-full my-2"
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputLabel className="my-3">Add Videos to playlist</InputLabel>
                <div className="my-3">
                    {videos.map((video) => {
                        return (
                            <div key={video.id}>
                                <input
                                    type="checkbox"
                                    name="vid"
                                    id=""
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
                        create
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
