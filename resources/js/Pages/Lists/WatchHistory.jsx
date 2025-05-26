import VideoListItem from "@/Components/VideoListItem";
import AuthLayout from "@/Layouts/AuthLayout";

export default function WatchHistory({ videos }) {
    console.log(videos);
    return (
        <AuthLayout>
            {videos.length == 0 ? (
                <p className="text-center text-xl my-4 font-bold">
                    this list is empty
                </p>
            ) : (
                videos.map((video) => {
                    return <VideoListItem video={video} isHistory={true} />;
                })
            )}
        </AuthLayout>
    );
}
