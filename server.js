import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import sequelize from "./util/database.js";
import authRoutes from "./routes/auth.js";
import listingsRoutes from "./routes/listings.js";

import User from "./models/user.js";
import Listing from "./models/listing.js";
import SpecificPrice from "./models/specificPrice.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).array("image", 2)
);

app.use("/images", express.static(path.join(__dirname, "images")));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// app.use(morgan('combined'));

app.use("/auth", authRoutes);
app.use("/listings", listingsRoutes);

app.use((error, req, res, next) => {
    const {
        statusCode = "500",
        message: errorMessage,
        data: errorData,
    } = error;
    return res.status(statusCode).json({
        message: errorMessage,
        data: errorData,
    });
});

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

Listing.belongsTo(User);
User.hasMany(Listing);
SpecificPrice.belongsTo(Listing);
Listing.hasMany(SpecificPrice);

sequelize
    .sync()
    .then((res) => {
        app.listen(process.env.PORT || 5000);
    })
    .catch((error) => {
        console.log(error);
    });
