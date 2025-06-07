import CHead from "@/Components/CHead";
import VideoItem from "@/Components/VideoItem";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Dashboard({ videos }) {
    console.log(videos);
    return (
        <AuthLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <CHead title={`Home`} />

            <div className="flex flex-wrap gap-5 my-2">
                {videos.map((vid) => {
                    return <VideoItem vid={vid} isOut={true} />;
                })}
            </div>
        </AuthLayout>
    );
}
