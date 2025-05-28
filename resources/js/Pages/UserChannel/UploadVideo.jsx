import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";

export default function UploadVideo({ channel }) {
    const { setData, errors, processing, post, progress } = useForm({
        title: "",
        description: "",
        thumbnail: "",
        video: "",
        tags: "",
    });
    const upload = (e) => {
        e.preventDefault();
        post(route("user.videos.save"));
    };
    return (
        <AuthLayout>
            <Head title="UploadVideo" />
            {progress ? (
                <div className="w-full">
                    <h1 className="text-center font-bold my-2 text-violet-500 ">
                        Uploading
                    </h1>
                    <div className="bg-white rounded-lg w-72 border shadow  p-4 flex justify-center">
                        <div className="w-full h-4 bg-gray-400 rounded-full">
                            <div
                                className={`w-[${progress.percentage}%] h-full text-center text-xs text-white bg-violet-500 rounded-full`}
                            >
                                {progress?.percentage}%
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={upload}>
                    <p className="my-3 font-bold">
                        Upload Video to {channel.channel_name}
                    </p>
                    <InputLabel className="my-1">Video Title</InputLabel>
                    <TextInput
                        className="w-full "
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} />
                    <InputLabel className="my-1">Video Tags</InputLabel>
                    <TextInput
                        className="w-full my-1"
                        onChange={(e) => setData("tags", e.target.value)}
                    />
                    <InputError message={errors.tags} />

                    <InputLabel className="my-1">Video Description</InputLabel>
                    <textarea
                        className="w-full my-2 rounded-xl"
                        rows={3}
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.description} />

                    <InputLabel
                        htmlFor="vid"
                        className="my-1 cursor-pointer w-full h-32 flex justify-center items-center bg-gray-300"
                    >
                        {" "}
                        Upload Video{" "}
                    </InputLabel>
                    <input
                        type="file"
                        name=""
                        className="hidden"
                        accept="video/*"
                        id="vid"
                        onChange={(e) => {
                            setData("video", e.target.files[0]);
                        }}
                    />
                    <InputError message={errors.video} />

                    <InputLabel
                        htmlFor="thumb"
                        className="my-1 cursor-pointer w-full h-32 flex justify-center items-center bg-gray-300"
                    >
                        {" "}
                        Upload Thumbnail{" "}
                    </InputLabel>
                    <input
                        type="file"
                        name=""
                        className="hidden"
                        accept="image/*"
                        id="thumb"
                        onChange={(e) => {
                            setData("thumbnail", e.target.files[0]);
                        }}
                    />
                    <InputError message={errors.thumbnail} />

                    <button
                        className="border block w-1/2 mx-auto border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        {" "}
                        Upload
                    </button>
                </form>
            )}
        </AuthLayout>
    );
}
