import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyAPIs from "express-validator";

import Listing from "../models/listing.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { validationResult } = bodyAPIs;

export const newListing = async (req, res, next) => {
    const {
        address,
        location,
        floorAndDoor,
        numberOfAnimals,
        typeOfAnimals,
        typeOfProperty,
        description,
        checkedOptions,
    } = req.body;
    const imageUrlPaths = req.files.map((url) => url.path.replace("\\", "/"));

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error("Form validation went wrong");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const listing = await Listing.create({
            address,
            location,
            floorAndDoor,
            numberOfAnimals,
            typeOfAnimals,
            typeOfProperty,
            description,
            servicesString: checkedOptions.split(",").join("_"),
            imageString: imageUrlPaths.join(" "),
            userId: req.userId,
        });

        const listingObject = listing.toJSON();

        delete listingObject.servicesString;
        delete listingObject.imageString;
        delete listingObject.userId;

        return res.status(200).json({
            message: "Listing registered successfully",
            listing: listingObject,
        });
    } catch (error) {
        imageUrlPaths.forEach((img) => clearImage(img));
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {
    try {
        const listings = await Listing.findAll({
            where: { userId: req.userId },
        });
        return res.status(200).json({
            message: "Get listings successfull",
            listings,
        });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const id = req.query.id;

    try {
        const listing = await Listing.findOne({ where: { id } });

        if (listing.userId !== req.userId) {
            const error = new Error("Listing does not belong this user");
            error.statusCode = 401;
            throw error;
        }

        const deletedListing = await listing.destroy();

        return res.status(200).json({
            message: "Listing deleted successfully",
            listing: deletedListing,
        });
    } catch (error) {
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

export const editListing = async (req, res, next) => {
    const id = req.query.id;
    const {
        address,
        location,
        floorAndDoor,
        numberOfAnimals,
        typeOfAnimals,
        typeOfProperty,
        description,
        checkedOptions,
    } = req.body;
    const imageUrlPaths = req.files.map((url) => url.path.replace("\\", "/"));
    try {
        const listing = await Listing.findOne({ where: { id } });
        if (listing.userId !== req.userId) {
            const error = new Error("Listing does not belong to this user");
            error.statusCode = 401;
            throw error;
        }
        if (!listing) {
            const error = new Error("Listing does not belong to this user");
            error.statusCode = 401;
            throw error;
        }
        for (let key in req.body) {
            listing[key] = req.body[key];
        }
        listing.servicesString = checkedOptions.split(",").join("_");
        if (imageUrlPaths.length !== 0) {
            listing.image.forEach((img) => {
                clearImage(img);
            });
            listing.imageString = imageUrlPaths.join(" ");
        }
        const updatedListing = await listing.save();
        return res.status(200).json({
            message: "Listing updated successfully",
            listing: updatedListing,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addPrices = async (req, res, next) => {
    console.log(req.body);
};

const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log("file was deleted");
    });
};
