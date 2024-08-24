import {getAll,sortByParam, searchPelicula, searchTag} from "./pelis.js";

function main() {

  // Si no hay argumento, se muestran todas las peliculas
  if (!process.argv[2]){
    console.log('Todas las peliculas');
    console.table(getAll());
  } else if (process.argv[2] === 'sort'){
    console.log(`Ordenar peliculas por ${process.argv[3]}`);
    sortByParam(process.argv[3]);
  } else if (process.argv[2] === 'search'){
    console.log(`Buscar pelicula por título: ${process.argv[3]}`);
    console.table(searchPelicula(process.argv[3]));
  } else if (process.argv[2] === 'tag'){
    console.log(`Todas las peliculas que tienen el tag: ${process.argv[3]}`);
    console.table(searchTag(process.argv[3]));
  }
}

main();
