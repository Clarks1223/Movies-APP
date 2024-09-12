import { useState, useEffect, useRef } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);
  useEffect(() => {
    //la condicion tiene el valor actual del isFirstInput
    if (isFirstInput.current) {
      //vacio = (serach=vacio)
      isFirstInput.current = search === '';
      //una vez cambia el valor, no se volvera a renderizar con el valor inicial
      return;
    }
    if (search === '') {
      setError('Debe ingresar el nombre de la pelicula');
      return; //return sin nada devuelve undefined
    }
    if (search.match(/^\d+$/)) {
      setError('El titulo de la pelicula no puede empezar con un numero');
      return;
    }
    if (search.length < 3) {
      setError('La busqueda debe tener almenos 3 caracteres');
      return;
    }
    //limpieza del useEffect
    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}
