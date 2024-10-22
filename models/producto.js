const Carrito = require('./carrito');

const db = require('../utils/database')



module.exports = class Producto {
    constructor(id, nombre, urlImagen, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    save() {


    }

    static fetchAll() {
        return db.execute('SELECT * FROM productos');
    }

    static findById(id) {
    }

    static deleteById(id) {
    }


}