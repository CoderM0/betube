import { Link } from "@inertiajs/react";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";

export default function AdminChannelCard({ channel }) {
    return (
        <div className="w-96 mx-4  sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
            <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                    className="object-cover h-full object-top  w-full"
                    src={`/storage/${channel.cover_img}`}
                    alt="Mountain"
                />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                    className="object-cover object-center h-32"
                    src={`/storage/${channel.logo}`}
                    alt="Woman looking front"
                />
            </div>
            <div className="text-center mt-2">
                <h2 className="font-semibold">{channel.channel_name}</h2>
                <p className="text-gray-500">{channel.description}</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                    <AiFillLike className="w-4 fill-current text-blue-900" />

                    <div>{channel.likes_count}</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                    <svg
                        className="w-4 fill-current text-blue-900"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                    </svg>
                    <div>{channel.subscribers.length}</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                    <FaEye className="w-4 fill-current text-blue-900" />

                    <div>{channel.views}</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                    <RxVideo className="w-4 fill-current text-blue-900" />

                    <div>{channel.videos_count}</div>
                </li>
            </ul>
            <div className="p-4 border-t mx-8 mt-2">
                <Link
                    href={route("admin.view_channel", channel.id)}
                    className="w-1/2 text-center block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                >
                    View
                </Link>
            </div>
        </div>
    );
}
