import MovieCard from "@/Components/MovieCard";
import Paginator from "@/Components/Paginator";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Home({ movies }) {
    console.log(movies);
    return (
        <AuthLayout>
            {movies.links && <Paginator links={movies.links} />}

            {movies.data.length > 0 ? (
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {movies.data.map((film) => (
                        <MovieCard movie={film} key={film.movieId} />
                    ))}
                </div>
            ) : (
                <p>No movies found.</p>
            )}
        </AuthLayout>
    );
}
