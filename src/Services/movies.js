export const searchMovies = async ({ search }) => {
  //si no se envian palabras para realizar la busqueda
  if (search === '') return null;

  try {
    //fetch de datos
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_APIKEY}&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;
    //se define el formato que tiene el obejto que llega (mapeo de datos)
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    //como usar custom errors
    throw new Error('Error searching movies' + e);
  }
};
