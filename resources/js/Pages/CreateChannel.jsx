import CHead from "@/Components/CHead";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiImageAddFill, RiImageEditFill } from "react-icons/ri";

export default function CreateChannel() {
    const { setData, processing, errors, post } = useForm({
        channel_name: "",
        description: "",
        logo: "",
        cover_img: "",
    });
    const [newlogo, setNewLogo] = useState(null);
    const [newCover, setNewCover] = useState(null);
    const create_channel = (e) => {
        e.preventDefault();
        post(route("user.channel.store"));
    };
    return (
        <AuthLayout>
            <CHead title={`create channel`} />

            <form className="" onSubmit={create_channel}>
                <div className="relative">
                    <div className="w-full flex justify-center items-center bg-gray-200 h-48 ">
                        {newCover ? (
                            <div className="relative w-full h-48">
                                <img
                                    src={URL.createObjectURL(newCover)}
                                    alt=""
                                    className="w-full object-cover h-48"
                                />
                                <label
                                    htmlFor="addcover"
                                    className="p-1 flex items-center gap-2 justify-center bg-yellow-900 absolute bottom-0 right-0 text-white w-20 text-center cursor-pointer"
                                >
                                    Edit <MdEdit />
                                </label>
                            </div>
                        ) : (
                            <label htmlFor="addcover">
                                <IoCloudUploadSharp
                                    size={"4rem"}
                                    color="green"
                                />
                                <InputError message={errors.cover_img} />
                            </label>
                        )}

                        <input
                            type="file"
                            name=""
                            id="addcover"
                            className="hidden "
                            onChange={(e) => {
                                setData("cover_img", e.target.files[0]);
                                setNewCover(e.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="absolute -bottom-8 left-3   w-36 h-36">
                        {newlogo ? (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(newlogo)}
                                    alt=""
                                    className="object-cover rounded-full w-36 h-36"
                                />
                                <label
                                    htmlFor="addlogo"
                                    className="flex items-center  justify-center absolute bottom-0 bg-white right-2 cursor-pointer w-10 h-10"
                                >
                                    <RiImageEditFill
                                        size={"2rem"}
                                        className="text-yellow-900"
                                    />
                                </label>
                            </div>
                        ) : (
                            <label
                                htmlFor="addlogo"
                                className="w-36 h-36 rounded-full cursor-pointer flex justify-center items-center border-2 border-red-900 bg-gray-200"
                            >
                                <RiImageAddFill size={"2.5rem"} color="green" />
                                <InputError message={errors.logo} />
                            </label>
                        )}
                    </div>
                    <input
                        type="file"
                        name=""
                        className="hidden"
                        id="addlogo"
                        onChange={(e) => {
                            setData("logo", e.target.files[0]);
                            setNewLogo(e.target.files[0]);
                        }}
                    />
                </div>
                <div className="p-2 mt-10">
                    <InputLabel className="mb-2">Channel Name</InputLabel>
                    <TextInput
                        type="text"
                        className="w-1/2"
                        onChange={(e) =>
                            setData("channel_name", e.target.value)
                        }
                    />
                    <InputError message={errors.channel_name} />
                </div>
                <div className="p-2">
                    <InputLabel className="mb-2">
                        Channel Description
                    </InputLabel>
                    <textarea
                        name=""
                        className="w-full  rounded-md"
                        rows={4}
                        onChange={(e) => setData("description", e.target.value)}
                        id=""
                    ></textarea>
                    <InputError message={errors.description} />
                </div>
                <button
                    className="border block w-1/2 mx-auto border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    disabled={processing}
                >
                    {" "}
                    Create
                </button>
            </form>
        </AuthLayout>
    );
}
