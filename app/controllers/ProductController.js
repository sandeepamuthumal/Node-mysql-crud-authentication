const db = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");

// image Upload
const multer = require("multer");
const path = require("path");

const Product = db.products;

const showProducts = async(req, res) => {
    const keyWord = req.body.keyword;

    if (keyWord !== undefined) {
        let products = await Product.findAll({
            where: {
                [Op.or]: [{
                        name: {
                            [Op.like]: `%${keyWord}%`,
                        },
                    },
                    {
                        intro: {
                            [Op.like]: `%${keyWord}%`,
                        },
                    },
                ],
            },
            attributes: ["id", "name", "intro"],
            order: [
                ["id", "DESC"]
            ],
        });

        const results = {
            status: "success",
            total: products.length,
            products: products,
        };

        return res.status(200).json(results);
    } else {
        let products = await Product.findAll({
            order: [
                ["id", "DESC"]
            ],
        });

        const results = {
            status: "success",
            total: products.length,
            products: products,
        };

        return res.status(200).json(results);
    }
};

const addProduct = async(req, res) => {
    let info = {};

    if (req.file !== undefined) {
        info = {
            image: req.file.path,
            name: req.body.name,
            intro: req.body.intro,
            category_id: req.body.category_id,
        };
    } else {
        info = {
            name: req.body.name,
            intro: req.body.intro,
            category_id: req.body.category_id,
        };
    }

    const isProduct = await Product.findOne({
        where: {
            name: req.body.name,
            intro: req.body.intro,
            category_id: req.body.category_id,
        },
    });

    console.log(isProduct);

    if (!isProduct) {
        const product = await Product.create(info);
        return res.json({ status: 400, message: "product created successfully" });
    } else {
        return res.json({ status: 400, message: "product already exists" });
    }
};

const getOneProduct = async(req, res) => {
    let id = req.params.id;
    let product = await Product.findOne({ where: { id: id } });
    res.status(200).send(product);
};

const updateProduct = async(req, res) => {
    let id = req.params.id;

    let info = {};

    if (req.file !== undefined) {
        let exProduct = await Product.findOne({ where: { id: id } });
        let path = exProduct.image;

        try {
            fs.unlinkSync(path);
        } catch (err) {
            console.error(err);
        }

        info = {
            image: req.file.path,
            name: req.body.name,
            intro: req.body.intro,
            category_id: req.body.category_id,
        };
    } else {
        info = {
            name: req.body.name,
            intro: req.body.intro,
            category_id: req.body.category_id,
        };
    }

    const product = await Product.update(info, { where: { id: id } });

    res.status(200).send('Product is updated !')
};

const deleteProduct = async(req, res) => {
    let id = req.params.id;

    let product = await Product.findOne({ where: { id: id } });

    let path = product.image;

    try {
        fs.unlinkSync(path);
        //file removed
    } catch (err) {
        console.error(err);
    }

    await Product.destroy({
        where: {
            id: id
        },
    });

    res.status(200).send('Product is deleted !')

};
// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb("Give proper files formate to upload");
    },
}).single("image");

module.exports = {
    showProducts,
    upload,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
};