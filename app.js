const path = require('path');

const express = require('express');
const bodyParser = require('body-parser')
const db = require('./utils/database')

const adminRoutes = require('./routes/admin')
const tiendaRoutes = require('./routes/tienda')
const errorController = require('./controllers/error')

db.execute('SELECT * FROM productos')
    .then(resultado => {
        // console.log(resultado);
        console.log(resultado[0]);
    })
    .catch(err => {
        console.log(err);
    })


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use((req, res, next) => {
    next();
});

app.use(errorController.get404)

app.listen(3000);