<?php

namespace App\OutServices;

use Illuminate\Support\Facades\Http;

class Recommenation
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
    static function get_movies_recommendations($moviename, $rate)
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
    static function get_videos_recommendations($video_id, $rate)
    {
        $url = 'http://127.0.0.1:5000/get_similar_videos';
        $data = [
            'video_id' => $video_id,
            'rate' => $rate,

        ];


        $response = Http::post($url, $data);

        $recommendations = $response->json();
        if ($recommendations == null) {

            return $recommendations;
        }
        $arr = array_keys($recommendations);
        if ($rate == 5) {
            array_shift($arr);
        }

        return $arr;
    }
}
