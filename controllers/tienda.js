const Producto = require('../models/producto');
const Carrito = require('../models/carrito');

exports.getProductos = (req, res) => {
    Producto.fetchAll()
        .then(([filas, dataCampos]) => {
            res.render('tienda/lista-productos', {
                prods: filas,
                titulo: "Productos de la tienda",
                path: "/productos"
            });
        })
        .catch(err => console.log(err));

};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (producto) => {
        res.render('tienda/detalle-producto', {
            producto: producto,
            titulo: producto.nombre,
            path: '/productos'
        });

    })
}

exports.getIndex = (req, res) => {
    Producto.fetchAll()
    .then(([filas, dataCampos]) => {
        res.render('tienda/index', {
            prods: filas,
            titulo: "Pagina principal de la Tienda",
            path: "/"
        });
    })
    .catch(err => console.log(err));
}

exports.getCarrito = (req, res, next) => {
    Carrito.getCarrito(carrito => {
        Producto.fetchAll(productos => {
            const productosEnCarrito = [];
            for (producto of productos) {
                const productoEnCarrito = carrito.productos.find(prod => prod.id === producto.id);
                if (productoEnCarrito) {
                    productosEnCarrito.push({ dataProducto: producto, cantidad: productoEnCarrito.cantidad });
                }
            }
            res.render('tienda/carrito', {
                path: '/carrito',
                titulo: 'Mi Carrito',
                productos: productosEnCarrito
            });

        })
    })

};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto => {
        Carrito.agregarProducto(idProducto, producto.precio);
        res.redirect('/carrito');
    })
}

exports.postEliminarProductoCarrito = (req, res, next) => {
    const idProducto = req.body.idProducto;
    Producto.findById(idProducto, producto => {
        Carrito.eliminarProducto(idProducto, producto.precio);
        res.redirect('/carrito');
    });
};

exports.getPedidos = (req, res, next) => {
    res.render('tienda/pedidos', {
        path: '/pedidos',
        titulo: 'Mis Pedidos'
    });
};