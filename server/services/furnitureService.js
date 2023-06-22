const { Error } = require('mongoose');
const Furniture = require('../models/Furniture');

exports.getAll = async (queryString) => {
    let data = Furniture.find({});

    if (queryString.where) {
        let [fieldName, ownerId] = queryString.where.split('=');
        ownerId = ownerId.replaceAll('"', '');

        //data = data.find({ _ownerId: ownerId });   //both are identical
        data = data.where('_ownerId').eq(ownerId);
    }

    return await data;
}

exports.getOne = (furnitureId) => Furniture.findById(furnitureId).lean();

exports.create = async (userId, furnitureData) => {
    const furniture = new Furniture({
        make: furnitureData.make,
        model: furnitureData.model,
        year: Number(furnitureData.year),
        description: furnitureData.description,
        price: Number(furnitureData.price),
        img: furnitureData.img,
        material: furnitureData.material,
        _ownerId: userId
    });

    await furniture.save();
};

exports.update = async (userId, furnitureId, furnitureData) => {

    const furniture = await Furniture.findById(furnitureId);
    if (!furniture) {
        throw new Error.DocumentNotFoundError('Could not find furniture!');
    }

    if (furniture._ownerId != userId) {
        throw new Error('User is not authorized to update this furniture!');
    }

    furniture.make = furnitureData.make;
    furniture.model = furnitureData.model;
    furniture.year = Number(furnitureData.year);
    furniture.description = furnitureData.description;
    furniture.price = Number(furnitureData.price);
    furniture.img = furnitureData.img;
    furniture.material = furnitureData.material;

    await furniture.save();
};

exports.delete = async (userId, furnitureId) => {
    const furniture = await Furniture.findById(furnitureId);

    if (!furniture) {
        throw new Error('Furniture not found!');
    }

    if (furniture._ownerId != userId) {
        throw new Error('User is not authorized to delete this furniture!');
    }

    await furniture.deleteOne();
};