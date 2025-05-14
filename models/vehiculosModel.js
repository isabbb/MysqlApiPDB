
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'trolley.proxy.rlwy.net',
    port:44033,
    user: 'root', 
    password: 'pNYpnscRMGlrpJRNPhSYuXTVjULqOtjJ', 
    database: 'railway'
});

async function traerVehiculos() {
    const [result] = await connection.query('SELECT * FROM Vehiculos');
    return result;
}

async function traerVehiculoPorId(id) {
    const [result] = await connection.query('SELECT * FROM Vehiculos WHERE id_vehiculo = ?', [id]);
    return result[0];
}

async function crearVehiculo(marca, modelo, anio, color, placa) {
    const [result] = await connection.query(
        'INSERT INTO Vehiculos (marca, modelo, anio, color, placa) VALUES (?, ?, ?, ?, ?)',
        [marca, modelo, anio, color, placa]
    );
    return result.insertId;
}

async function actualizarVehiculoPorId(id, marca, modelo, anio, color, placa) {
    const [result] = await connection.query(
        'UPDATE Vehiculos SET marca = ?, modelo = ?, anio = ?, color = ?, placa = ? WHERE id_vehiculo = ?',
        [marca, modelo, anio, color, placa, id]
    );
    return result.affectedRows > 0;
}

async function eliminarVehiculoPorId(id) {
    const [result] = await connection.query('DELETE FROM Vehiculos WHERE id_vehiculo = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { traerVehiculos, traerVehiculoPorId, crearVehiculo, actualizarVehiculoPorId, eliminarVehiculoPorId };







