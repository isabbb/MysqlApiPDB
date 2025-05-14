const { Router } = require('express');
const router = Router();
const vehiculosModel = require('../models/vehiculosModel');

// Obtener todos los vehículos
router.get('/Zautos/vehiculos/traer', async (req, res) => {
    try {
        const result = await vehiculosModel.traerVehiculos();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener vehículos: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener vehículos por marca
router.get('/Zautos/vehiculos/traerpormarca/:marca', async (req, res) => {
    try {
        const marca = req.params.marca;
        const result = await vehiculosModel.traerVehiculosPorMarca(marca);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener vehículo por marca: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener un vehículo por ID
router.get('/Zautos/vehiculos/traerporid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await vehiculosModel.traerVehiculoPorId(id);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener vehículo por ID: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Crear un vehículo
router.post("/Zautos/vehiculos/crear", async (req, res) => {
    try {
        const { marca, modelo, anio, color, placa } = req.body;
        await vehiculosModel.crearVehiculo(marca, modelo, anio, color, placa);
        res.status(201).json({ message: "Vehículo creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el vehículo: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Actualizar un vehículo por ID
router.put("/Zautos/vehiculos/actualizar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { marca, modelo, anio, color, placa } = req.body;
        const success = await vehiculosModel.actualizarVehiculoPorId(id, marca, modelo, anio, color, placa);
        if (success) {
            res.json({ message: "Vehículo actualizado exitosamente" });
        } else {
            res.status(404).json({ message: "Vehículo no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el vehículo: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Eliminar un vehículo por ID
router.delete("/Zautos/vehiculos/eliminar/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const success = await vehiculosModel.eliminarVehiculoPorId(id);
        if (success) {
            res.json({ message: "Vehículo eliminado exitosamente" });
        } else {
            res.status(404).json({ message: "Vehículo no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el vehículo: ", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;




