import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { reponseData } from "../config/reponse.js";

const model = initModels(sequelize);

// Bình luận hình ảnh
export const commentPicture = async (req, res) => {
    const { userId, pictureId, commentDate, commentContent } = req.body;
    let newComment = {
        nguoi_dung_id: userId,
        hinh_id: pictureId,
        ngay_binh_luan: commentDate,
        noi_dung: commentContent
    }
    try {
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
            nguoi_dung_id: userId
        }
    })
    reponseData(data, "Thành công", 200, res);
}

