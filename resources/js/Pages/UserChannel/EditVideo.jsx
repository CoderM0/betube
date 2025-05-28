import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

export default function EditVideo({ channel, video }) {
    const [newthumb, setNewThumb] = useState(null);
    const { setData, errors, processing, post, progress, data } = useForm({
        title: video.title,
        tags: video.tags.join(","),
        description: video.description,
    });
    const update_video = (e) => {
        e.preventDefault();
        post(route("user.videos.update", video.id));
    };
    return (
        <AuthLayout channel={channel}>
            <h1 className="my-2 text-center font-bold">
                Edit {video.title} video
            </h1>
            <form onSubmit={update_video} className="w-full flex">
                <div className="w-2/3 px-2">
                    <InputLabel className="my-2">Video Title</InputLabel>
                    <TextInput
                        className="w-full my-1 "
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputLabel className="my-1">Video Tags</InputLabel>
                    <TextInput
                        className="w-full my-1"
                        value={data.tags}
                        onChange={(e) => setData("tags", e.target.value)}
                    />
                    <InputLabel className="my-1">Video Description</InputLabel>
                    <textarea
                        className="w-full my-2 rounded-xl"
                        rows={3}
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>

                    <button
                        className="border block w-1/2 mx-auto border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {" "}
                        Update
                    </button>
                </div>

                <div className="w-1/3">
                    <InputLabel
                        htmlFor="thumb"
                        className="my-1 cursor-pointer w-full h-52   rounded-lg"
                    >
                        {" "}
                        <p className="py-2 text-center cursor-pointer flex justify-center items-center gap-3">
                            {" "}
                            Edit Thumbnail <MdEdit />
                        </p>
                        <img
                            src={
                                newthumb
                                    ? URL.createObjectURL(newthumb)
                                    : `/storage/${video.thumbnail_path}`
                            }
                            alt=""
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </InputLabel>
                    <input
                        type="file"
                        name=""
                        className="hidden"
                        accept="image/*"
                        id="thumb"
                        onChange={(e) => {
                            setData("thumbnail_path", e.target.files[0]);
                            setNewThumb(e.target.files[0]);
                        }}
                    />
                </div>
            </form>
        </AuthLayout>
    );
}
