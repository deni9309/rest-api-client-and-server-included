const router = require('express').Router();

const furnitureService = require('../services/furnitureService');

router.get('/', async (req, res) => {
    try {
console.log(req.query);

        const furnitures = await furnitureService.getAll(req.query);

        res.status(200).json(furnitures);
    } catch (err) {
        res.status(404).json({
            message: 'Could not find furniture data!'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        await furnitureService.create(req.user._id, req.body);

        res.status(201).end();
    } catch (err) {
        res.status(400).json({
            message: 'Cannot create furniture!'
        });
    }
});

router.get('/:furnitureId', async (req, res) => {
    try {
        const furniture = await furnitureService.getOne(req.params.furnitureId);

        res.status(200).json(furniture);
    } catch (err) {
        res.status(404).json({
            message: 'Cannot find furniture!'
        });
    }
});

router.put('/:furnitureId', async (req, res) => {
    const data = req.body;
    const userId = req.user._id;
    const furnitureId = req.params.furnitureId;

    try {
        await furnitureService.update(userId, furnitureId, data);
   
        res.status(200).end();
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

router.delete('/:furnitureId', async (req, res) => {   
    const userId = req.user._id;
    const furnitureId = req.params.furnitureId;

    try {
        await furnitureService.delete(userId, furnitureId);

        res.status(204).end();
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

module.exports = router;
