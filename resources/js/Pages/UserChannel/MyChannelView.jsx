import CHead from "@/Components/CHead";
import NavLink from "@/Components/NavLink";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import { MdEdit } from "react-icons/md";

export default function MyChannelView({ channel, children }) {
    return (
        <AuthLayout>
            <CHead title={channel.channel_name} />

            <div className="border rounded-xl px-2">
                <div className="relative">
                    <div className="w-full flex justify-center items-center  h-48 ">
                        <div className="relative w-full h-48">
                            <img
                                src={`/storage/${channel.cover_img}`}
                                alt=""
                                className="w-full object-cover h-40"
                            />
                            <p className="font-bold absolute bottom-0 left-44 text-xl">
                                {channel.channel_name}
                            </p>
                        </div>
                    </div>
                    <div className="absolute -bottom-8 left-3   w-36 h-36">
                        <div className="relative">
                            <img
                                src={`/storage/${channel.logo}`}
                                alt=""
                                className="object-cover rounded-full w-36 h-36 ring ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center  justify-end px-5">
                        <Link
                            href={route("user.channel.edit")}
                            className="flex items-center gap-2 rounded-xl px-3 py-1 bg-yellow-800 text-white"
                        >
                            <MdEdit size={"1.5rem"} />
                            <span>Edit </span>
                        </Link>
                    </div>
                </div>

                <p className=" text-indigo-600 mt-10 rounded-xl p-2 w-11/12">
                    {channel.description}
                </p>
                <div className="flex justify-between w-1/2">
                    <NavLink
                        href={route("user.channel.view")}
                        active={route().current("user.channel.view")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        href={route("user.channel.videos")}
                        active={route().current("user.channel.videos")}
                    >
                        Videos
                    </NavLink>
                    <NavLink
                        href={route("user.channel.playlists")}
                        active={route().current("user.channel.playlists")}
                    >
                        PlayLists
                    </NavLink>
                    <NavLink
                        href={route("user.channel.stat")}
                        active={route().current("user.channel.stat")}
                    >
                        Statistics
                    </NavLink>
                </div>
                <div className="mt-10">{children}</div>
            </div>
        </AuthLayout>
    );
}
