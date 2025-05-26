import NavLink from "@/Components/NavLink";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ViewChannel({ channel, children }) {
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
                </div>

                <p className=" text-indigo-600 mt-10 rounded-xl p-2 w-11/12">
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
