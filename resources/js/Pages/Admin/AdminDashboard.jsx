import CHead from "@/Components/CHead";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdminChannelCard from "./AdminChannelCard";

export default function AdminDashboard({ channels }) {
    console.log("c", channels);
    return (
        <AuthenticatedLayout>
            <CHead title={"Admin - Channels"} />
            <div className="flex items-center flex-wrap">
                {channels.length == 0 ? (
                    <p className="text-2xl font-bold text-center my-3">
                        No Channels Yet
                    </p>
                ) : (
                    channels.map((channel) => {
                        return (
                            <AdminChannelCard
                                channel={channel}
                                key={channel.id}
                            />
                        );
                    })
                )}
            </div>
        </AuthenticatedLayout>
    );
}
