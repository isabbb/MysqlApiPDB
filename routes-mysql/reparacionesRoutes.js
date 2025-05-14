const { Router } = require('express');
const router = Router();
const reparacionesModel = require('../models/reparacionesModel');

// Obtener todas las reparaciones
router.get('/Zautos/reparaciones/traer', async (req, res) => {
    try {
        const result = await reparacionesModel.traerReparaciones();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener reparaciones: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener una reparación por ID
router.get('/Zautos/reparaciones/traerporid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await reparacionesModel.traerReparacionPorId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener reparación por ID: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Crear una reparación
router.post("/Zautos/reparaciones/crear", async (req, res) => {
    try {
        const { id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico } = req.body;
        await reparacionesModel.crearReparacion(id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico);
        res.status(201).json({ message: "Reparación creada exitosamente" });
    } catch (error) {
        console.error("Error al crear la reparación: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Actualizar una reparación por ID
router.put("/Zautos/reparaciones/actualizar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico } = req.body;
        const success = await reparacionesModel.actualizarReparacionPorId(id, id_vehiculo, id_servicio, fecha_servicio, costo_total, mecanico);
        if (success) {
            res.json({ message: "Reparación actualizada exitosamente" });
        } else {
            res.status(404).json({ message: "Reparación no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar la reparación: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar una reparación por ID
router.delete("/Zautos/reparaciones/eliminar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const success = await reparacionesModel.eliminarReparacionPorId(id);
        if (success) {
            res.json({ message: "Reparación eliminada exitosamente" });
        } else {
            res.status(404).json({ message: "Reparación no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la reparación: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;








