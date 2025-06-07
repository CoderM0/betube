import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import MyChannelView from "./MyChannelView";

export default function ChannelStatistics({ channel }) {
    return (
        <MyChannelView channel={channel}>
            <div class="text-gray-900 pt-5 pb-24 px-6 w-full bg-gray-50">
                <div class="max-w-7xl mx-auto text-center">
                    <h2 class="text-4xl font-bold mb-6 text-gray-800">
                        Channel Statistics
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        class="w-12 h-12 text-gray-900"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="text-3xl font-extrabold text-gray-800">
                                {channel.subscribers.length}+
                            </div>
                            <div class="text-gray-500">Users Suscribed</div>
                        </div>
                        {/* viwes */}
                        <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <FaEye className="w-12 h-12 fill-current text-gray-900" />
                                </div>
                            </div>
                            <div class="text-3xl font-extrabold text-gray-800">
                                {channel.views}+
                            </div>
                            <div class="text-gray-500">Total Views</div>
                        </div>
                        {/*  */}
                        <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <RxVideo className="w-12 h-12 fill-current text-gray-900" />
                                </div>
                            </div>
                            <div class="text-3xl font-extrabold text-gray-800">
                                {channel.videos_count} +
                            </div>
                            <div class="text-gray-500">Videos Uploaded</div>
                        </div>

                        <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <AiFillLike className="w-12 h-12 fill-current text-gray-900" />
                                </div>
                            </div>
                            <div class="text-3xl font-extrabold text-gray-800">
                                {channel.likes_count} +
                            </div>
                            <div class="text-gray-500">Likes granted</div>
                        </div>
                        <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="mb-6 flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                                <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <AiFillDislike className="w-12 h-12 fill-current text-gray-900" />
                                </div>
                            </div>
                            <div class="text-3xl font-extrabold text-gray-800">
                                {channel.dislikes_count} +
                            </div>
                            <div class="text-gray-500">DisLikes</div>
                        </div>
                    </div>
                </div>
            </div>
        </MyChannelView>
    );
}
