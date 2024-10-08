import './App.css';
import { Movies } from './components/Movie';
//importo el custom hook movies
import { useMoviesApi } from './hook/useMoviesApi.js';
//importo el custom hook search
import { useSearch } from './hook/useSearch.js';
//import noResponseFilms from './mocks/no-films.json';
import { useCallback, useState } from 'react';
//importo el debounce
import debounce from 'just-debounce-it';

function App() {
  //ordena las peliculas por titulo de forma alfabetica
  const [sort, setSort] = useState(false);

  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMoviesApi({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    []
  );

  const handleSubmit = (event) => {
    //evita que el formulario se reinicie
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    if (movies) setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    //se actualiza cada vez que hay un cambio
    updateSearch(event.target.value);
    //Busqueda automaticamente al escribir
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Norbit, Exodo, Super man"
          />
          <label>
            Ordenar por titulo
            <input type="checkbox" onChange={handleSort} checked={sort} />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <h1>Los resultados de busqueda</h1>
      <main>{loading ? <>Cargango...</> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
