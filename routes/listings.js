import express from "express";
import bodyAPIs from "express-validator";
import checkAPIs from "express-validator";

import { isAuth } from "../middleware/is-auth.js";
import * as listingsController from "../controllers/listings.js";

const { body } = bodyAPIs;
const { check } = checkAPIs;

const router = express.Router();

router.post(
    "/newlisting",
    isAuth,
    [
        body("address").notEmpty().withMessage("1"),
        body("location").notEmpty(),
        body("floorAndDoor").notEmpty().withMessage("2"),
        body("numberOfAnimals").trim().notEmpty().withMessage("3"),
        body("typeOfAnimals")
            .trim()
            .custom((value, { req }) => {
                if (
                    value !== "Cão" &&
                    value !== "Gato" &&
                    value !== "Cães e gatos"
                ) {
                    const error = new Error(
                        "Number of animals is not a number"
                    );
                    error.statusCode = 400;
                    throw error;
                }
                return true;
            })
            .withMessage("4"),
        body("typeOfProperty")
            .trim()
            .custom((value, { req }) => {
                if (
                    value !== "Apartamento" &&
                    value !== "Moradia" &&
                    value !== "Quinta" &&
                    value !== "Hotel para cães"
                ) {
                    const error = new Error("Not an accepted type of property");
                    error.statusCode = 400;
                    throw error;
                }
                return true;
            })
            .withMessage("5"),
        body("description").not().isEmpty().withMessage("6"),
        body("checkedOptions").notEmpty(),
        body("checkedOptions").notEmpty().withMessage("7"),
        check("image").custom((value, { req }) => {
            if (req.files.length === 0) {
                const error = new Error("No images submitted");
                error.statusCode = 400;
                throw error;
            }
            return true;
        }),
    ],
    listingsController.newListing
);

router.get("/getuserlistings", isAuth, listingsController.getUserListing);

router.delete("/deleteListing", isAuth, listingsController.deleteListing);

router.put("/editlisting/", isAuth, listingsController.editListing);

router.post("/addprices", isAuth, listingsController.addPrices);

export default router;
