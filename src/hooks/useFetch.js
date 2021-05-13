imoport React from "react"

const apiKey = process.env.REACT_APP_MOVIE_KEY;


export default async function useFetch (endpoint, append){
    const response = await fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}${append}`)
     const data = await response.json();
}
// `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
// `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=similar`

// `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`


