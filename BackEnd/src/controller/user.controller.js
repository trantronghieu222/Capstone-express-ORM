import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { reponseData } from "../config/reponse.js";
import bcrypt from 'bcrypt';

const model = initModels(sequelize);

// Bình luận hình ảnh
export const commentPicture = async (req, res) => {
    const { pictureId } = req.params;
    const { userId, commentDate, commentContent } = req.body;
    let newComment = {
        nguoi_dung_id: userId,
        hinh_id: pictureId,
        ngay_binh_luan: commentDate,
        noi_dung: commentContent
    }
    try {
        // Kiểm tra hình ảnh đã được xoá hay chưa
        let isDeletePic = await model.hinh_anh.findOne({
            where: {
                hinh_id: pictureId,
                is_deleted: 0
            }
        })
        if (!isDeletePic) {
            return reponseData("", "Hình ảnh không tồn tại", 500, res);
        }
        // Bình luận hình ảnh
        await model.binh_luan.create(newComment);
        reponseData("", "Thành công", 200, res);
    } catch (error) {
        reponseData("", "Bình luận không thành công", 500, res);
    }
}

// Get thông tin user
export const getUser = async (req, res) => {
    const { userId } = req.params;
    let data = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: userId
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Lấy danh sách ảnh đã lưu theo userId
export const getSavedPicture = async (req, res) => {
    const { userId } = req.params;
    let data = await model.luu_anh.findAll({
        where: {
            nguoi_dung_id: userId
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Get danh sách ảnh đã tạo theo userId
export const getCreatedPicture = async (req, res) => {
    const { userId } = req.params;
    let data = await model.hinh_anh.findAll({
        where: {
            nguoi_dung_id: userId,
            is_deleted: 0
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Put thông tin cá nhân user
import fs from 'fs';
import path from 'path';

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let file = req.file;
        let { email, password, username, age } = req.body;

        const user = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: userId
            }
        });

        if (!user) {
            return res.status(404).send('Người dùng không tồn tại');
        }

        // Đường dẫn cho avt
        let newFilePath = file ? file.filename : user.anh_dai_dien;

        // Mã hoá password
        let hashedPassword = password ? bcrypt.hashSync(password, 10) : user.mat_khau;

        // Cập nhật thông tin người dùng
        await model.nguoi_dung.update({
            email: email || user.email,
            mat_khau: hashedPassword,
            ho_ten: username || user.ho_ten,
            tuoi: age || user.tuoi,
            anh_dai_dien: newFilePath
        }, {
            where: { nguoi_dung_id: userId }
        });

        // Xóa ảnh cũ nếu có ảnh mới
        if (file && user.anh_dai_dien) {
            let oldFilePath = path.join(process.cwd(), "/public/imgs/", user.anh_dai_dien);
            fs.unlink(oldFilePath, (err) => {
                if (err) console.error(`Lỗi khi xóa ảnh cũ: ${err}`);
            });
        }

        reponseData({}, "Cập nhật thông tin người dùng thành công", 200, res);
    } catch (error) {
        console.log(error);
        reponseData("", "Cập nhật thất bại", 400, res);
    }
};