import { remove, concat } from "lodash";

export class ReporteDescargas {
    ID: String
    Titulo: String
    Promedio_puntaje: String
    Velocidad_maxima: String
    Velocidad_minima: String
    Total_descargas: String

    constructor(ID?:String, titulo?:String, Promedio_puntaje?:String, Velocidad_maxima?:String, Velocidad_minima?:String, Total_descargas?:String) {
        this.ID = ID
        this.Promedio_puntaje = Promedio_puntaje
        this.Velocidad_maxima = Velocidad_maxima
        this.Velocidad_minima = Velocidad_minima
        this.Total_descargas = Total_descargas
    }

    static fromJson(ExperienciaJson) {
        return Object.assign(new ReporteDescargas(), ExperienciaJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}