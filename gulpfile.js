
// function tarea(done){
//     console.log("desde la primer tarea")
//     done();
// }
// //para terminar la tarea gulp necesita callback (done, fn, function, callback)

// //llamar la funcion en gulp

// exports.tarea=tarea;

// //se la llama en la terminal con gulp tarea 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const sass=require('gulp-sass')(require('sass'));
//importamos la funcionalidad de sass o de la libreria con require
//es sintaxis de node js
//gulp-sass retorna una sola funcion

const { src, dest, watch, parallel }=require('gulp')
//gulp retorna multiples funciones por eso van llaves
//src es la ubicacion del archivo
//dest guarda el archivo compilado
//watch es para que se ejecuten los cambios solo cuando se ejecuta la tarea desde el terminal
//parallel es para ejecutar tareas de forma paralela 

const plumber=require('gulp-plumber')
//plumber es para que no detenga la ejecucion del workflow un error, lo muestra en terminal y siggue

const webp = require('gulp-webp')
//funcion para transformar las imagenes en archivo webp

const imagemin = require('gulp-imagemin')

const cache = require('gulp-cache')

const avif=require('gulp-avif')
//avif es un formato para imagenes nuevo pero no tiene buen soporte


//funciones para mejorar un codigo ya finalizado
const autoprefixer = require('autoprefixer')
const cssnano= require('cssnano')
const postcss = require('gulp-postcss')

//se hace para encontrar un texto cuando ya se optimizo el codigo
const sourcemaps = require('gulp-sourcemaps')

//mejorar el codigo de javascript con terser
const terser = require('gulp-terser-js')




function css(done){
    //identidifar el archivo a compilar
    src('src/scss/**/*.scss')
    //los asteriscos son para que todo archiovo que tenga esa extension se ejecuten en el  y no solo uno
        .pipe(sourcemaps.init())//se inicia sourcemaps
        .pipe(plumber())
        //pipe es para llamar a la siguente accion
        .pipe(sass()) //sass() compila
        .pipe(postcss([autoprefixer(), cssnano()]))//hace el codigo css mas liviano y en una sola linea, se hace al finalizar
        .pipe(sourcemaps.write('.'))//se escribe todo en la ubicacion que elijamos, en este caso un . para guardar en la misma que se compila
        .pipe(dest('build/css'))//almacena el archivo en la ubicacion que coloquemos

    done() 
}

//agregar un watch para que se ejecuten los cambios solo cuando se ejecute la tarea desde el terminal

function dev( done ){
    watch('src/scss/**/*.scss', css);
    //identifica el archivo y cuando note un cambio llama a la tarea de css que compila ese archivo en una hoja de estilos
    watch('src/js/**/*.js', javascript);
    done()
}

//funcion para compilar archivo de javascript 

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done()
}

//IMAGENES

function versionwebp(done){
    const opciones={
        quality:50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}

function versionavif(done){
    const opciones={
        quality:50
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}

function imagenes(done){
    const opciones={
        optimizationLevel:3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}


exports.css=css;
exports.js=javascript
exports.versionwebp=versionwebp;
exports.imagenes=imagenes;
exports.versionavif=versionavif;
exports.dev=parallel(dev, versionwebp, imagenes, versionavif, javascript);


