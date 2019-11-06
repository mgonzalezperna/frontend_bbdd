
export class Locacion {
    id: number
    descripcion: String
    calle: String
    numero: Number
    localidad: String
    provincia: String
    //coordenadas
    superficie: number
    METROS_CUADRADOS_POR_PERSONA = 0.8


    capacidadMaximaEventosAbiertos(): Number {
        return this.superficie / this.METROS_CUADRADOS_POR_PERSONA
    }

    static fromJson(UsuarioJson) {
        return Object.assign(new Locacion(), UsuarioJson)
    }
}