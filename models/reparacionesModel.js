const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'admin123', 
    database: 'bdzautos'
});

async function traerReparaciones() {
    const [result] = await connection.query('SELECT * FROM Reparaciones');
    return result;
}

async function traerReparacionPorId(id) {
    const [result] = await connection.query('SELECT * FROM Reparaciones WHERE id_reparacion = ?', [id]);
    return result[0];
}

async function crearReparacion(id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico) {
    const [result] = await connection.query(
        'INSERT INTO Reparaciones (id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico) VALUES (?, ?, ?, ?, ?)',
        [id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico]
    );
    return result.insertId;
}

async function actualizarReparacionPorId(id, id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico) {
    const [result] = await connection.query(
        'UPDATE Reparaciones SET id_vehiculo = ?, id_servicio = ?, fecha_servicio = ?, costo_total = ?, mecanico = ? WHERE id_reparacion = ?',
        [id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico, id]
    );
    return result.affectedRows > 0;
}

async function eliminarReparacionPorId(id) {
    const [result] = await connection.query('DELETE FROM Reparaciones WHERE id_reparacion = ?', [id]);
    return result.affectedRows > 0;
}

module.exports = { traerReparaciones, traerReparacionPorId, crearReparacion, actualizarReparacionPorId, eliminarReparacionPorId };







