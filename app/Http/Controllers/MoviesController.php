<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\OutServices\Recommenation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MoviesController extends Controller
{

    public function movies_home()
    {

        return Inertia::render("Movies/Home", ['movies' => Film::orderBy('movieId')->orderBy('movieId', 'ASC')->filter(request(['search_film']))->paginate(30)]);
    }
    public function view_details($id)
    {


        $movie = Film::where("movieId", $id)->first();
        $moviename = trim($movie->title);

        $arr = Recommenation::get_movies_recommendations($moviename, 5);
        $result = Film::whereIn('title', $arr)->orderByRaw('FIELD(title, "' . implode('","', $arr) . '") ASC')->limit(6)->get();

        return Inertia::render('Movies/MoviePlayer', ['movie' => $movie, 'recommendations' => $result]);
    }
}
