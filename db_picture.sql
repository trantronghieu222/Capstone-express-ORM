/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`hinh_id`,`nguoi_dung_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2024-08-14', 'Dễ thương quá');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 1, '2024-08-14', 'Đẹp quá trời uiii');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 1, 1, '2024-08-14', 'Ảnh đẹp ghiaaa');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 3, 11, '2024-08-14', 'Ảnh đẹp ghiaaa'),
(5, 3, 7, '2024-08-14', 'Ảnh đẹp ghiaaa'),
(6, 3, 3, '2024-08-14', 'Ảnh đẹp ghiaaa'),
(7, 3, 4, '2024-08-14', 'Ảnh đẹp'),
(8, 3, 5, '2024-08-14', 'Ảnh đẹp'),
(9, 7, 5, '2024-08-14', 'Ảnh đẹp quá');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `is_deleted`) VALUES
(1, 'spy x family', '1724505439081_spyxfamily.jpg', 'manga', 1, 0);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `is_deleted`) VALUES
(2, 'Iron Man', '1724505445721_ironman.jpg', 'marvel', 1, 0);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `is_deleted`) VALUES
(3, 'naruto', '1724505539113_naruto.jpg', 'hình ảnh naruto', 3, 0);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`, `is_deleted`) VALUES
(4, 'deadpool img', '1724169601961_deadpool.jpg', 'hình ảnh marvel deadpool', 2, 0),
(5, 'dragonball ', '1724170479929_goku.jpg', 'hình ảnh anime songoku', 2, 0),
(6, 'naruto', '1724213608641_naruto.jpg', 'hình ảnh anime naruto', 1, 1),
(7, 'meme', '1724213785466_npc_meme.png', 'hình ảnh meme npc', 1, 1),
(11, 'Avatar anime', '1724662561223_anhAnimeCute.jpg', 'Avatar Anime nam nữ đẹp, cute, độc đáo làm hình đại diện', 3, 0),
(12, 'Hình nền đẹp', '1724685232829_anhDep.jpg', 'Những cảnh đẹp buồn tận cùng', 3, 1),
(13, 'Hình nền ngầu 2', '1725005300492_hinh-nen-ngau-2.jpg', 'Những cảnh đẹp buồn tận cùng', 7, 0);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 1, '2024-08-12');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 2, '2024-08-13');


INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'hieu123@gmail.com', '$2b$10$/qpYkbmy50nEsvqsR8mPf./9KfDamJfFQ8/2McMmyKjfYgYSeclXW', 'Trần Trọng Hiếu', 25, '1724685695545_avatar_avtdep.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'long5921@gmail.com', '$2b$10$21.NVdLxoqQB6Y0tzJ0bseQR9jMYkjQ22UiTi/xEMXBUtOzPV.xfO', 'Phạm Hoàng Long', 19, '');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'abc@gmail.com', '$2b$10$bz9p05pNlwlwjjDk.agNhOHRDfka2N19sX8mpasqLhSr0YMNsxbMu', 'Chi Chi', 21, '1724685627827_avatar_avtAnya.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'demo001@gmail.com', '$2b$10$qCqx6RIfqTrDldeKkySDAeRuE.ODuYo30yt1QKc0UC6/YVAexc0xW', 'Demo001', 22, ''),
(5, 'demo002@gmail.com', '$2b$10$Se5oorA/cbfcIAYKQ1sIpudXMvC3qX/8N2MM7SVJ7JJXse/EwPRO.', 'Demo002', 23, ''),
(6, 'demo003@gmail.com', '$2b$10$ZAHxKVfyf55vS98QwIqIgOv8OfKiD0xIIPmWFYAsHHRo4tAIXyyaa', 'Demo003', 30, ''),
(7, 'tranhieu123@gmail.com', '$2b$10$DmV2fALDKnKtn4GDK/aTq.o4bPpLxxQlB6zRJt6flA2oCEjG/l8km', 'Trần Hiếu', 25, '1725005445744_avatar_Avatar Doremon cute-doi-mu.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;