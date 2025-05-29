import { Link } from "@inertiajs/react";

export default function MovieCard({ movie }) {
    return (
        <div className="relative group bg-[#1c1c1c] rounded overflow-hidden shadow hover:shadow-lg transition">
            <img
                src={"/images/last.jpg"}
                alt="movie"
                className="w-full h-52 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <Link
                    href={route("movie.view", movie.movieId)}
                    className="block bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700 text-white"
                >
                    Watch Now
                </Link>
            </div>
            <div className="p-2">
                <h3 className="text-sm font-semibold truncate text-white">
                    {movie.title}
                </h3>
                <p className="text-xs text-gray-400">24 eps • {movie.genres}</p>
            </div>
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                {movie.rating}
            </span>
        </div>
    );
}
