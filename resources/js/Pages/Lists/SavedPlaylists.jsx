import PlayListCard from "@/Components/PlayListCard";
import AuthLayout from "@/Layouts/AuthLayout";

export default function SavedPlaylists({ playlists }) {
    return (
        <AuthLayout>
            <div className="mt-2">
                <p className="font-bold my-2">Saved PlayLists</p>
                {playlists.length == 0 ? (
                    <p className="font-bold text-center my-4">
                        You Dont Have Any Saved Playlists Yet
                    </p>
                ) : (
                    <div className="flex flex-wrap">
                        {playlists.map((playlist) => {
                            return (
                                <PlayListCard
                                    playlist={playlist}
                                    key={playlist.id}
                                    isOwner={false}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}
