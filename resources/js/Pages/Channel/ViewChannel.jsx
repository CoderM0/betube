import NavLink from "@/Components/NavLink";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, usePage } from "@inertiajs/react";

export default function ViewChannel({ channel, children }) {
    const { user } = usePage().props.auth;
    console.log("channel", channel);
    return (
        <AuthLayout>
            <div className="border rounded-xl px-2">
                <div className="relative">
                    <div className="w-full flex justify-center items-center  h-48 ">
                        <div className="relative w-full h-48">
                            <img
                                src={`/storage/${channel.cover_img}`}
                                alt=""
                                className="w-full object-cover h-40"
                            />
                            <div
                                className={` absolute ${
                                    channel.user_id == user.id
                                        ? " -bottom-5 "
                                        : " -bottom-16"
                                }   left-44 `}
                            >
                                <p className="font-bold text-xl">
                                    {channel.channel_name}{" "}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {channel.subscribers.length} Subscribers
                                </p>
                                {channel.user_id != user.id && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <Link
                                            preserveScroll
                                            method="POST"
                                            className=""
                                            href={route(
                                                "user.subscribe",
                                                channel.id
                                            )}
                                        >
                                            {channel.subscribers.find(
                                                (susbs) => susbs.id == user.id
                                            ) ? (
                                                <p className="py-1 px-3 rounded-3xl bg-gray-400 text-white">
                                                    UnSubscribe{" "}
                                                </p>
                                            ) : (
                                                <p className="py-1 px-3 rounded-3xl bg-black text-white">
                                                    Subscribe{" "}
                                                </p>
                                            )}
                                        </Link>
                                    </div>
                                )}
                            </div>
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
                </div>

                <p className="  text-indigo-600 mt-10 rounded-xl p-2 w-11/12">
                    {" "}
                    {channel.description}
                </p>
                <div className="flex justify-between w-1/2">
                    <NavLink
                        href={route("channels.channel.home", channel.id)}
                        active={route().current("channels.channel.home")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        href={route("channels.channel.videos", channel.id)}
                        active={route().current("channels.channel.videos")}
                    >
                        Videos
                    </NavLink>
                    <NavLink
                        href={route("channels.channel.playlists", channel.id)}
                        active={route().current("channels.channel.playlists")}
                    >
                        PlayLists
                    </NavLink>
                </div>
                <div className="mt-10">{children}</div>
            </div>
        </AuthLayout>
    );
}
// for later
//     {data.vid && (
//                         <div className="flex flex-wrap gap-5 my-2">
//                             {data.vid.map((vid) => {
//                                 return <VideoItem vid={vid} isOut={false} />;
//                             })}
//                         </div>
//                     )}
//                     {data.playlists && (
//                         <div>
//                             {data.playlists.length == 0 ? (
//                                 <div className="flex justify-center items-center">
//                                     Link
//                                 </div>
//                             ) : (
//                                 <div>{data.playlists[0].name}</div>
//                             )}
//                         </div>
// )
// }
