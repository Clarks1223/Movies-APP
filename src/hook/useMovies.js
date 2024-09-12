import { useRef, useState } from 'react';
import { searchMovies } from '../Services/movies';

export function useMoviesApi({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const previousSearch = useRef(search);

  const getMovies = async () => {
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
  };
  return { movies, getMovies, loading };
}
