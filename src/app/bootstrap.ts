import { Usuario, TipoUsuario, Free, Profesional, Amateur } from "./domain/Usuario";
import { Evento, Abierto, Cerrado } from "./domain/Evento";
import { Locacion } from "./domain/Locacion";
import { last, concat, merge } from "lodash";
import { Invitacion } from "./domain/Invitacion";
/*
// Auxiliares para que mi bootstrap tenga siempre eventos próximos
var later = new Date()
later.setHours(later.getHours() + 1)
var estaSemana = new Date()
estaSemana.setDate(estaSemana.getDate() + 6)

// Usuarios
export const usuarios: Usuario[] = [
    new Usuario(new Profesional, "marquitos22", "Marcos Mundstock", new Date(1942, 5 - 1, 25)),
    new Usuario(new Amateur, "puccio", "Carlos López Puccio", new Date(1946, 10 - 1, 9)),
    new Usuario(new Free, "maronna", "Jorge Maronna", new Date(1948, 8 - 1, 1)),
    new Usuario(new Free, "carlitos", "Carlos Núñez Cortés", new Date(1942, 10 - 1, 15)),
    new Usuario(new Profesional, "daniel", "Daniel Rabinovich", new Date(1943, 11 - 1, 18))
]

export const current_user: Usuario = new Usuario(new Profesional, "dodain", "Fernando Dodino", new Date(1979, 5, 15))
current_user.email = "me@dodain.com"
current_user.amigos = usuarios


// Eventos

var fiestaAlgo3 = new Cerrado("fiesta de algo 3", new Date(2018, 11, 15, 22, 30), new Locacion("UNSAM", 1000), current_user, 65)
fiestaAlgo3.confirmados = usuarios

export const eventos = [
    new Abierto("Show de SKA-P", new Date(2018, 11 - 1, 28, 23, 30), new Locacion("Estadio Obras", 1000), new Usuario(new Profesional, "pulpul", "Roberto Ojea", new Date(1971, 2, 20)), 18),
    new Cerrado("casamiento del Johnny", new Date(2018, 12 - 1, 20), new Locacion("Casa de Johnny", 25), new Usuario(new Free, "Johnny22", "Johnathanh Gutierrez", new Date(1990, 11, 12)), 50),
    new Abierto("Evento que siempre es hoy", later, new Locacion("UNSAM", 20000), new Usuario(new Profesional, "SoyRuta", "Carlos Ruta", new Date(1950, 11, 13)), 20),
    new Abierto("Evento que siempre esta semana", estaSemana, new Locacion("El Obelisco", 20000), new Usuario(new Profesional, "SoyRuta", "Florencio Satraca", new Date(1950, 11, 13)), 20),
    fiestaAlgo3,
]

// Invitaciones

export const invitaciones: Invitacion[] = [
    new Invitacion(eventos[1] as Cerrado, 3),
]

merge(current_user.invitaciones, invitaciones)
current_user.organizar(last(eventos))


*/
