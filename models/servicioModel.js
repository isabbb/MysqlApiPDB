const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'admin123', 
    database: 'bdzautos'
});

async function traerServicios() {
    const [result] = await connection.query('SELECT * FROM Servicios');
    return result;
}

async function traerServicioPorId(id) {
    const [result] = await connection.query('SELECT * FROM Servicios WHERE id_servicio = ?', [id]);
    return result[0];
}

async function crearServicio(nombre, descripcion, precio) {
    const [result] = await connection.query(
        'INSERT INTO Servicios (nombre, descripcion, precio) VALUES (?, ?, ?)',
        [nombre, descripcion, precio]
    );
    return result.insertId;
}

async function actualizarServicioPorId(id, nombre, descripcion, precio) {
    const [result] = await connection.query(
        'UPDATE Servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id_servicio = ?',
        [nombre, descripcion, precio, id]
    );
    return result.affectedRows > 0;
}

async function eliminarServicioPorId(id) {
    const [result] = await connection.query('DELETE FROM Servicios WHERE id_servicio = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { traerServicios, traerServicioPorId, crearServicio, actualizarServicioPorId, eliminarServicioPorId };





