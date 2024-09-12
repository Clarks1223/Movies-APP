import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMovies } from '../Services/movies';

export function useMoviesApi({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const previousSearch = useRef(search);
  
  //se inyecta el search por parametros para que se ejecute una sola vez
  const getMovies = useCallback(async ({ search }) => {
    //evitar que se haga la misma busqueda 2 veces
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      //actualiza el valor del use ref
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      //se ejecuta tanto en el try como en el catch
      setLoading(false);
    }
  }, []);
  //Ordena las peliculas por titulo
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
    //Locale compare compara incluso con tildes
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
