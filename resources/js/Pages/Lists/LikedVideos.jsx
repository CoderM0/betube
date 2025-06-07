import CHead from "@/Components/CHead";
import VideoListItem from "@/Components/VideoListItem";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";

export default function LikedVideos({ videos, list_name, type }) {
    console.log("hh", videos);
    return (
        <AuthLayout>
            <CHead title={`Liked Videos`} />

            {videos.length == 0 ? (
                <p className="text-center font-bold text-xl my-4">
                    You dont have {list_name} yet
                </p>
            ) : (
                <div className="flex">
                    <section
                        className={
                            "w-1/3 h-screen  bg-gray-100 pt-5 rounded-md border "
                        }
                    >
                        <img
                            src={`/storage/${videos[0].thumbnail_path}`}
                            className="w-11/12 mx-auto object-cover rounded-xl my-3 "
                        />
                        <p className="font-bold text-2xl ml-4 text-gray-900">
                            {list_name}
                        </p>
                        <div className="flex justify-center my-5 bg-white text-gray-900 w-1/2 mx-auto rounded-xl">
                            <Link
                                href={route("play.playlist", 1)}
                                data={{ type: type }}
                            >
                                Play all
                            </Link>
                        </div>
                        <div className="mx-4 my-4 flex justify-between items-center text-gray-700 text-sm">
                            <p>{videos.length} Videos</p>{" "}
                            <p>
                                Last updated on
                                {" " +
                                    new Date(
                                        videos[
                                            videos.length - 1
                                        ].pivot.created_at
                                    ).toLocaleDateString()}
                            </p>
                        </div>
                    </section>{" "}
                    <section className="w-2/3">
                        {videos.map((video) => {
                            return <VideoListItem video={video} />;
                        })}
                    </section>
                </div>
            )}
        </AuthLayout>
    );
}
