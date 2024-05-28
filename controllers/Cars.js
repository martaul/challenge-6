import Cars from "../models/CarsModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getCars = async (req, res) => {
    try {
        const response = await Cars.findAll({
            attributes:['id','name','harga','image'],
            include:[{
                model: User,
                attributes:['name','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const createCar = async (req, res) => {
    const {name, harga, image} = req.body;
    try {
        await Cars.create({
            name: name,
            harga: harga,
            image: image,
            userId: req.userId
        });
        res.status(201).json({msg: "Car Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateCars = async (req, res) => {
    
}

export const deleteCars = async (req, res) => {
    
}