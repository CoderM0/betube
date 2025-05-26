import VideoListItem from "@/Components/VideoListItem";
import AuthLayout from "@/Layouts/AuthLayout";

export default function SearchResult({ videos, serachterm }) {
    return (
        <AuthLayout searchterm={serachterm}>
            <div className="my-2">
                <h1>Search Results for {serachterm}</h1>
                <div className="mt-2">
                    {videos.map((vid) => {
                        return <VideoListItem video={vid} isHistory={false} />;
                    })}
                </div>
            </div>
        </AuthLayout>
    );
}
