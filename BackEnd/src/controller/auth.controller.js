import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { reponseData } from "../config/reponse.js";
import bcrypt from 'bcrypt';
import { createToken } from "../config/jwt.js";
const model = initModels(sequelize);

export const signUp = async (req, res) => {
    let { email, matKhau, hoTen, tuoi } = req.body;
    let checkEmail = await model.nguoi_dung.findAll({
        where: {
            email: email
        }
    })

    if (checkEmail.length > 0) {
        reponseData("", "Email đã tồn tại", 409, res);
        return;
    }

    let newData = {
        email: email,
        mat_khau: bcrypt.hashSync(matKhau, 10),
        ho_ten: hoTen,
        tuoi: tuoi,
        anh_dai_dien: ""
    }

    await model.nguoi_dung.create(newData)
    reponseData("", "Đăng ký thành công", 201, res);
}

export const signIn = async (req, res) => {
    let { email, matKhau } = req.body;
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail) {
        if (bcrypt.compareSync(matKhau, checkEmail.mat_khau)) {
            let token = createToken({nguoiDungId: checkEmail.dataValues.nguoi_dung_id});
            reponseData(token, "Đăng nhập thành công", 200, res)
        }
        else {
            reponseData("", "Mật khẩu không đúng", 403, res)
        }
    } else {
        reponseData("", "Email không đúng", 403, res)
    }
}