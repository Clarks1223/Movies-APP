import './App.css';
import { Movies } from './components/Movie';
//importo el custom hook movies
import { useMoviesApi } from './hook/useMovies.js';
//importo el custom hook search
import { useSearch } from './hook/useSearch.js';
//import noResponseFilms from './mocks/no-films.json';

function App() {
  

  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMoviesApi({ search });

  const handleSubmit = (event) => {
    //evita que el formulario se reinicie
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    //se actualiza cada vez que hay un cambio
    updateSearch(event.target.value);
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
