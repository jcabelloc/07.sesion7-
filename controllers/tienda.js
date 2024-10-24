const Producto = require('../models/producto');
const Carrito = require('../models/carrito');

exports.getProductos = (req, res) => {
    Producto.findAll()
        .then(productos => {
            res.render('tienda/lista-productos', {
                prods: productos,
                titulo: "Productos de la tienda",
                path: "/productos"
            });

        })
        .catch(err => console.log(err));
};

exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findAll({ where: { id: idProducto } })
        .then(productos => {
            if (productos.length == 0) {
                res.redirect('/');
            }
            const producto = productos[0];
            res.render('tienda/detalle-producto', {
                producto: producto,
                titulo: producto.nombre,
                path: '/productos'
            });
        })
        .catch(err => console.log(err));

    /*
    Producto.findByPk(idProducto)
        .then(producto => {
            res.render('tienda/detalle-producto', {
                producto: producto,
                titulo: producto.nombre,
                path: '/productos'
            });
        })
        .catch(err => console.log(err));*/
}

exports.getIndex = (req, res) => {
    Producto.findAll()
        .then(productos => {
            res.render('tienda/index', {
                prods: productos,
                titulo: "Pagina principal de la Tienda",
                path: "/"
            });

        })
        .catch(err => console.log(err));
}

exports.getCarrito = (req, res, next) => {
    req.usuario
        .getCarrito()
        .then(carrito => {
            return carrito
                .getProductos()
                .then(productos => {
                    res.render('tienda/carrito', {
                        path: '/carrito',
                        titulo: 'Mi Carrito',
                        productos: productos
                    });
                })
        })
        .catch(err => console.log(err));
};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    let micarrito;
    let nuevaCantidad = 1;
    req.usuario
        .getCarrito()
        .then(carrito => {
            micarrito = carrito;
            return carrito.getProductos({ where: { id: idProducto } });
        })
        .then(productos => {
            let producto;
            if (productos.length > 0) {
                producto = productos[0];
            }
            if (producto) {
                nuevaCantidad = producto.carritoItem.cantidad + 1;
                return producto;
            }
            return Producto.findByPk(idProducto);
        })
        .then(producto => {
            return micarrito.addProducto(producto, {
                through: { cantidad: nuevaCantidad }
            });
        })
        .then(() => {
            res.redirect('/carrito');
        })
        .catch(err => console.log(err));
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