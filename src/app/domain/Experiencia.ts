import { remove, concat } from "lodash";

export class Experiencia {
    idContenido: String
    Titulo: String
    Puntaje: String
    Comentario: String

    constructor(id?:String, archivo?:String, puntaje?:String, comentario?:String) {
        this.idContenido = id
        this.Titulo = archivo
        this.Puntaje = puntaje
        this.Comentario = comentario
    }

    static fromJson(ExperienciaJson) {
        return Object.assign(new Experiencia(), ExperienciaJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}