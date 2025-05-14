const express = require('express');
const morgan = require('morgan');

// Importación de rutas
const vehiculosRoutes = require('./routes-mysql/vehiculosRoutes');
const serviciosRoutes = require('./routes-mysql/servicioRoutes');
const reparacionesRoutes = require('./routes-mysql/reparacionesRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas de cada entidad
app.use( vehiculosRoutes);
app.use( serviciosRoutes);
app.use( reparacionesRoutes);

app.listen(3000, () => {
    console.log('Microservicio FullGas corriendo en puerto 3000 🚀');
});









