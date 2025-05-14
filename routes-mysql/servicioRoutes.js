const { Router } = require('express');
const router = Router();
const serviciosModel = require('../models/servicioModel');

// Obtener todos los servicios
router.get('/Zautos/servicios/traer', async (req, res) => {
    try {
        const result = await serviciosModel.traerServicios();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener servicios: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener un servicio por ID
router.get('/Zautos /servicios/traerporid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await serviciosModel.traerServicioPorId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener servicio por ID: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Crear un servicio
router.post("/FullGas/servicios/crear", async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        await serviciosModel.crearServicio(nombre, descripcion, precio);
        res.status(201).json({ message: "Servicio creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el servicio: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Actualizar un servicio por ID
router.put("/FullGas/servicios/actualizar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, precio } = req.body;
        const success = await serviciosModel.actualizarServicioPorId(id, nombre, descripcion, precio);
        if (success) {
            res.json({ message: "Servicio actualizado exitosamente" });
        } else {
            res.status(404).json({ message: "Servicio no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el servicio: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar un servicio por ID
router.delete("/FullGas/servicios/eliminar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const success = await serviciosModel.eliminarServicioPorId(id);
        if (success) {
            res.json({ message: "Servicio eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Servicio no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el servicio: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;







