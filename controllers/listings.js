import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyAPIs from 'express-validator';

import Listing from '../models/listing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { validationResult } = bodyAPIs;

export const newListing = async (req, res, next) => {
    const {address, location, floorAndDoor, numberOfAnimals, typeOfAnimals, typeOfProperty, description, checkedOptions} = req.body;
    const imageUrlPaths = req.files.map(url => url.path.replace("\\" ,"/"));

    console.log(typeOfAnimals);

    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const error = new Error('Form validation went wrong');
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
            servicesString: checkedOptions.split(',').join('_'),
            imageString: imageUrlPaths.join(' '),
            userId: req.userId
        });
        
        const listingObject = listing.toJSON();

        delete listingObject.servicesString;
        delete listingObject.imageString;
        delete listingObject.userId;
        
        return res.status(200).json({
            message: 'Listing registered successfully',
            listing: listingObject
        })
    } catch (error) {
        imageUrlPaths.forEach(img => clearImage(img));
        error.statusCode = error.statusCode || 500;
        next(error);
    }
};

export const getUserListing = async (req, res, next) => {
    
    try {
        const listings = await Listing.findAll({where: {userId: req.userId}});
        return res.status(200).json({
            message: 'Get listings successfull',
            listings
        })
    } catch (error) {
        console.log(error);
    }
    
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log('Images delete error'));
};