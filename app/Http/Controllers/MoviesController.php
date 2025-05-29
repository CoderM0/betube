<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MoviesController extends Controller
{
    public function addrate($moviename, $rate)
    {

        $url = 'http://127.0.0.1:5000/get_top5_recommendation';
        $data = [
            'name' => $moviename,
            'rate' => $rate,

        ];


        $response = Http::post($url, $data);


        $recommendations = $response->json();

        $arr = array_keys($recommendations);
        if ($rate == 5) {
            array_shift($arr);
        }

        return $arr;
    }
    public function movies_home()
    {

        return Inertia::render("Movies/Home", ['movies' => Film::orderBy('movieId')->orderBy('movieId', 'ASC')->paginate(30)]);
    }
    public function view_details($id)
    {


        $movie = Film::where("movieId", $id)->first();
        $moviename = trim($movie->title);

        $arr = $this->addrate($moviename, 5);
        $result = Film::whereIn('title', $arr)->orderByRaw('FIELD(title, "' . implode('","', $arr) . '") ASC')->limit(6)->get();

        return Inertia::render('Movies/MoviePlayer', ['movie' => $movie, 'recommendations' => $result]);
    }
}
