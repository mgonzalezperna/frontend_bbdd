import { remove, concat } from "lodash";

export class Categoria {
    idCategoria: String
    nombre: String
    descripcion: String

    constructor(id?:String, nombre?:String, descripcion?:String) {
        this.idCategoria = id
        this.nombre = nombre
        this.descripcion = descripcion
    }

    static fromJson(CategoriaJson) {
        return Object.assign(new Categoria(), CategoriaJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}