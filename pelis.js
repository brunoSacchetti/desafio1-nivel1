import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAll() {
    const datos = fs.readFileSync(path.join(__dirname + "/pelis.json"));
    return JSON.parse(datos);
}

function sortByParam(propiedad){
    const peliculas = fs.readFileSync(path.join(__dirname + "/pelis.json"));
    const peliculasParsed = JSON.parse(peliculas);
    
    peliculasParsed.sort((a,b) => {

        //Si es un numero
        if (typeof a[propiedad] === 'number' && typeof b[propiedad] === 'number'){
            return a[propiedad] - b[propiedad];
        }

        //Si es un texto
        if (typeof a[propiedad] ==='string' && typeof b[propiedad] ==='string'){
            // Esto permite ordenar cadenas de forma alfabética, respetando caracteres especiales o diferentes alfabetos.
            return a[propiedad].localeCompare(b[propiedad]);
        }

        //Si son distintos tipos de datos
        return 0;
    });
    console.log(peliculasParsed);
}

function searchPelicula(tituloABuscar){
    const peliculas = getAll();
    //Convierte a minusculas el titulo, y verificia si contiene el titulo a buscar tambien en minusculas
    return peliculas.filter((peli) => peli.title.toLowerCase().includes(tituloABuscar.toLowerCase()));

}

function searchTag(tagABuscar){
    const peliculas = getAll();
    // Para almacenar las peliculas con ese tag
    let peliculasConTags = [];

    //Para cada pelicula de todas las peliculas
    for(const peli in peliculas){
        //Para cada tag en el array de Tags
        for(const tag in peliculas[peli].tags){
            //Si el tag coincide con el buscado, lo agrega a la lista de peliculas con ese tag
            if(peliculas[peli].tags[tag].toLowerCase() === tagABuscar.toLowerCase()){
                peliculasConTags.push(peliculas[peli]);
            }
        }
    }
    return peliculasConTags;
}

export { getAll, sortByParam, searchPelicula, searchTag}
