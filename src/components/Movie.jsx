export function ListOfMovies({ list }) {
  //no se debe utilizar el contrato de la API
  return (
    <ul className="movies">
      {list.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <h4>{movie.year}</h4>
          <img src={movie.poster} />
        </li>
      ))}
    </ul>
  );
}
export const NoResults = () => {
  return <p>No se han encontrado resultados</p>;
};

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListOfMovies list={movies} /> : <NoResults />;
}
