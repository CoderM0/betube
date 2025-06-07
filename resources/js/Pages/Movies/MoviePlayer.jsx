import CHead from "@/Components/CHead";
import PlayerLayout from "@/Layouts/PlayerLayout";

export default function MoviePlayer({ movie, recommendations }) {
    console.log(recommendations);
    return (
        <PlayerLayout>
            <CHead title={movie.title} />

            <main class="flex-grow  mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <section class="md:col-span-2 space-y-4">
                    <div class="w-full aspect-video bg-black rounded overflow-hidden shadow-lg">
                        <img
                            src="/images/last.jpg"
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </div>

                    <div class="flex justify-between items-center text-gray-400 text-sm font-semibold">
                        <button
                            id="prev-ep"
                            class="px-3 py-1 rounded bg-green-700 hover:bg-green-800 disabled:opacity-50"
                            disabled
                        >
                            Previous Episode
                        </button>
                        <span id="episode-info" class="text-green-400">
                            Movie - {movie.title}
                        </span>
                        <button
                            id="next-ep"
                            class="px-3 py-1 rounded bg-green-700 hover:bg-green-800"
                        >
                            Next Episode
                        </button>
                    </div>
                </section>

                <aside>
                    <h2 class="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3">
                        You Might Also Like
                    </h2>

                    <div class="w-full h-screen overflow-y-auto">
                        {recommendations.map((recommended) => {
                            return (
                                <div
                                    class="relative group bg-[#1c1c1c] rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                                    onclick="loadAnime('Attack on Titan', 1, 'https://cdn.myanimelist.net/images/anime/10/47347.jpg', 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Eren lives in a world where enormous walls protect humanity from man-eating giants known as Titans. But when a colossal Titan breaks the wall, everything changes.')"
                                >
                                    <img
                                        src="/images/last.jpg"
                                        alt="movie"
                                        class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div class="p-2">
                                        <h3 class="text-sm font-semibold truncate text-white">
                                            {recommended.title}
                                        </h3>
                                        <p class="text-xs text-gray-400">
                                            24 eps • {recommended.genres}
                                        </p>
                                    </div>
                                    <span class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                        {recommended.rating}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </aside>
            </main>
        </PlayerLayout>
    );
}
