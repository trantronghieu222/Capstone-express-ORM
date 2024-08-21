import jwt from 'jsonwebtoken'

export const createToken = (data) => {
    return jwt.sign({ data: data }, "NODE_43", { algorithm: "HS256", expiresIn: "5d" })
}

export const verifyToken = (token) => {
    return jwt.verify(token, "s3cR3t!kEy#12345&jwT!@#", (error) => { return error })
}

export const decodeToken = (token) => {
    return jwt.decode(token)
}

export const middleWareToken = (req, res, next) => {
    let { token } = req.headers;
    let checkToken = verifyToken(token);
    if (checkToken == null) {
        next()
    } else { 
        console.log(checkToken.message)
        res.status(401).send("Unauthorized")
    }
}