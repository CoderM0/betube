import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        avatar: "",
        password_confirmation: "",
    });
    const [newImg, setNwImg] = useState(null);
    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div>
            <Head title="Register" />

            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <form
                    className="w-screen m-0  bg-white shadow sm:rounded-lg flex justify-center "
                    onSubmit={submit}
                >
                    <div className=" p-3 flex-1">
                        <div className="relative w-32 mx-auto">
                            <img
                                src={
                                    newImg
                                        ? URL.createObjectURL(newImg)
                                        : "/images/imgplacholder.jpg"
                                }
                                className="w-32 h-32 mx-auto rounded-full"
                            />
                            <InputError
                                message={errors.avatar}
                                className="mt-2"
                            />
                            <label
                                className="absolute bottom-0 right-0 rounded-full bg-white border p-1"
                                htmlFor="newimg"
                            >
                                {newImg ? (
                                    <FaEdit
                                        color={"indigo"}
                                        size={"1.5rem"}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <MdAddAPhoto
                                        color={"green"}
                                        size={"1.5rem"}
                                        className="cursor-pointer"
                                    />
                                )}
                            </label>
                            <input
                                id="newimg"
                                type="file"
                                className="hidden "
                                onChange={(e) => {
                                    setData("avatar", e.target.files[0]);
                                    setNwImg(e.target.files[0]);
                                }}
                            />
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">
                                Sign up
                            </h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-md">
                                    <input
                                        className="w-full px-8 mb-5 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text"
                                        placeholder="Name"
                                        value={data.name}
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                        placeholder="Confirrm password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                    <Link
                                        href={route("login")}
                                        className="rounded-md block text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 my-3"
                                    >
                                        Already registered?
                                    </Link>
                                    <button
                                        disabled={processing}
                                        className="mt-5 disabled:bg-indigo-300 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    >
                                        <svg
                                            className="w-6 h-6 -ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                            <path d="M20 8v6M23 11h-6" />
                                        </svg>
                                        <span className="ml-3">Sign Up</span>
                                    </button>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to abide by templatana's
                                        <a
                                            href="#"
                                            className="border-b border-gray-500 border-dotted"
                                        >
                                            Terms of Service
                                        </a>
                                        and its
                                        <a
                                            href="#"
                                            className="border-b border-gray-500 border-dotted"
                                        >
                                            Privacy Policy
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <img src="/images/registerillustration.png" alt="" />
                    </div>
                </form>
            </div>
        </div>
    );
}
