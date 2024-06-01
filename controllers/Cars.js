import Cars from "../models/CarsModel.js";
import User from "../models/UserModel.js";
import fs from "fs";

export const getCars = async (req, res) => {
    try {
        const response = await Cars.findAll({
            include:[{
                model: User
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const createCar = async (req, res) => {
    try {
        const { name, harga } = req.body;
        const nama = req.user.name;
        const image = req.file.filename;
        if (!name || !harga || !image) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const car = await Cars.create({
            name,
            harga,
            image,
            createdBy: nama,
            updatedBy: 0,
            deletedBy: 0,
        });

        res.status(201).json({
            message: "Car added successfully",
            data: car
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: error
        });
    }
};


export const updateCars = async (req, res) => {
    const car = await Cars.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!car) return res.status(404).json({msg: "Mobil tidak ditemukan"});
    const {name, harga} = req.body;
    const nama = req.user.name;
    let new_image ='';

    if(req.file){
        new_image = req.file.filename;
        try{
            fs.unlinkSync("./uploads/" + req.body.old_image);
        } catch(err){
            console.log(err);
        }
    } else {
        new_image = req.body.old_image ;
    }
    try {
        const cars = await Cars.update({
            name,
            harga,
            image: new_image,
            updatedBy: nama 
        },{
            where:{
                id: car.id
            }
        });
        res.status(201).json({
            message: "Car added successfully",
            data: cars
        });
    } catch (error) {
        res.status(400).json({msg: error.message, data: error});
    }
}


export const deleteCars = async (req, res) => {
    try {
        const { id } = req.params;
        const nama = req.user.name;

        if (isNaN(id)) {
            throw new Error("Id yang diinput tidak valid!");
        }

        const car = await Cars.findByPk(id);
        if (!car) {
            throw new Error("Car not found");
        }
        car.deletedBy = nama;
        await car.save();
        
        await car.destroy();

        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
            data: {
                deletedCar: car
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
}