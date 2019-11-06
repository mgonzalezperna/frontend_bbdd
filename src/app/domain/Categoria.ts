import { remove, concat } from "lodash";

export class Categoria {
    id: String
    nombre: String
    descripcion: String

    constructor(id?:String, nombre?:String, descripcion?:String) {
        this.id = id
        this.nombre = id
        this.descripcion = id
    }

    static fromJson(CategoriaJson) {
        return Object.assign(new Categoria(), CategoriaJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}