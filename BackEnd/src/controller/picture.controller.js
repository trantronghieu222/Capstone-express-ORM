import { reponseData } from "../config/reponse.js";
import sequelize from "../models/connect.js";
import { Op } from 'sequelize';
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

// Lấy ds ảnh
export const getPicture = async (req, res) => {
    const data = await model.hinh_anh.findAll();
    reponseData(data, "Thành công", 200, res);
}

// Tìm kiếm hình ảnh bằng tên
export const searchPictureByName = async (req, res) => {
    const { name } = req.query;
    const data = await model.hinh_anh.findAll({
        where: {
            ten_hinh: {
                [Op.like]: `%${name}%`
            }
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Get thông tin ảnh và người tạo ảnh bằng id ảnh
export const getPictureAndUsers = async (req, res) => {
    const { pictureId } = req.params;
    const data = await model.hinh_anh.findOne({
        where: {
            hinh_id: pictureId
        },
        include: ["nguoi_dung"]
    })
    reponseData(data, "Thành công", 200, res);
}

// Get thông tin bình luận theo Id ảnh
export const getCommentPicture = async (req, res) => {
    const { pictureId } = req.params;
    const data = await model.binh_luan.findAll({
        where: {
            hinh_id: pictureId
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Get thông tin đã lưu hình này chưa theo id ảnh --
export const getSavedPictureStatus = async (req, res) => {
    const { pictureId } = req.params;
    let data = await model.luu_anh.findAll({
        where: {
            hinh_id: pictureId
        }
    })
    reponseData(data, "Thành công", 200, res);
}

// Xoá ảnh đã tạo theo pictureId
export const delPicture = async (req, res) => {
    const { pictureId } = req.params;
    try {
        await model.hinh_anh.destroy({
            where: {
                hinh_id: pictureId
            }
        })
        reponseData("", "Thành công", 200, res);
    } catch (error) {
        reponseData("", "Lỗi khi xoá", 400, res);
    }
}

// Thêm hình ảnh
export const addPicture =  async (req, res) => {
    try {
        let file = req.file;
        let { imgName, description, userId } = req.body;

        if (!file || !imgName || !userId) {
            return res.status(400).send('Thiếu thông tin bắt buộc');
        }

        // Đường dẫn đến file đã upload
        let filePath = file.filename;

        // Thêm thông tin ảnh vào bảng `hinh_anh` bằng cách sử dụng `.create`
        const newImage = await model.hinh_anh.create({
            ten_hinh: imgName,
            duong_dan: filePath,
            mo_ta: description,
            nguoi_dung_id: userId
        });

        reponseData(newImage, "Thêm thành công", 200, res);
    } catch (error) {
        console.error(error);
        reponseData("", "Đã xảy ra lỗi trong quá trình upload", 500, res);

    }
}
