import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
        console.log(user);
    })
    
}

// export const adminOnly = async (req, res, next) =>{
//     const user = await Users.findOne({
//         attributes:['role']
//     });
//     if (user.role == "member") {
//         return res.status(403).json({ msg: "Akses terlarang" });
//     }

//     // Jika semua verifikasi lolos, lanjutkan ke middleware berikutnya
//     next();
//}