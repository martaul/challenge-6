import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const createUser = async(req, res) => {
    const { name, email, role, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            role:role,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, email, role, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    
    let hashPassword = user.password;
    if (password && password !== "") {
        try {
            const salt = await bcrypt.genSalt();
            hashPassword = await bcrypt.hash(password, salt);
        } catch (error) {
            return res.status(500).json({ msg: "Error hashing password" });
        }
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await Users.update({
            name: name,
            email: email,
            role: role,
            password: hashPassword
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}