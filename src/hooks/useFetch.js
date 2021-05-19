import { useState } from "react";

const apiKey = process.env.REACT_APP_MOVIE_KEY;

// export default function useFetch(endpoint, append) {
//   return `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}${append}`;
// }

export default function useFetch(endpoint) {
  const [loading, setLoading] = useState(true);

  function get(append) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.themoviedb.org/3${endpoint}?api_key=${apiKey}${append}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  }
  return { get, loading };
}
