# Capstone Express ORM (dự án API pinterest)

## Tổng Quan

Dự án backend này được xây dựng bằng **Node.js** với **Express.js** và **Sequelize ORM**. Nó cung cấp các chức năng xác thực người dùng, quản lý hình ảnh, và bình luận trên hình ảnh. Dự án sử dụng **JWT** để xác thực an toàn và bao gồm middleware để bảo vệ các tuyến đường (routes).

## API Endpoints

### Xác Thực Người Dùng

- **Đăng Nhập**: \`POST /localhost:8080/auth/sign-in\`
  - Request Body: \`{ "email": "user@example.com", "matKhau": "password123" }\`
  - Response: JWT token cho các yêu cầu đã xác thực.

- **Đăng Ký** : \`POST /localhost:8080/auth/sign-up\`
  - Request Body: \`{ "email": "user@example.com", "matKhau": "password123", hoTen: "username", tuoi: "number" }\`

### Quản Lý Hình Ảnh

- **Get Danh Sách Hình Ảnh**: \`GET /localhost:8080/picture/get-picture\`

- **Get Tìm Kiếm Danh Sách Ảnh Theo Tên**: \`GET /localhost:8080/picture/search-picture?name=tenhinhanh\`

- **Get Thông Tin Hình Ảnh Và Người Tạo Theo Id Ảnh**: \`GET /localhost:8080/picture/get-picture-id/:pictureId\`

- **Get Thông Tin Bình Luận Theo Id Ảnh**: \`GET /localhost:8080/picture/get-commentPicture/:pictureId\`

- **Get Thông Tin Đã Lưu Hình Này Chưa Theo Id Ảnh**: \`GET /localhost:8080/picture/get-statusPicture/:pictureId\`
  - Chỉ dành cho người dùng đã xác thực.

- **Post Thêm Một Ảnh Của User**: \`Post /localhost:8080/picture/create-picture\`
  - Request Body (form-data):
    - `imgName`: "image name" (optional)
    - `description`: "image description" (optional)
    - `userId`: "1" (optional)
    - `fileImg`: <image_file> (optional)
  - Chỉ dành cho người dùng đã xác thực.

- **Delete Xoá Ảnh Đã Tạo Theo Id Ảnh**: \`DELETE /localhost:8080/pictures/delete-picture/:pictureId\`
  - Xóa mềm một hình ảnh bằng cách đặt cờ \`is_deleted\` thành \`1\`.
  - Chỉ dành cho người dùng đã xác thực.

### Quản Lý người dùng

- **Post Để Lưu Thông Tin Bình Luận Của Người Dùng Với Hình Ảnh**: \`POST /localhost:8080/user/comment/:pictureId\`
  - Request Body: \`{ "userId": 1, "commentDate": "2024-08-26", "commentContent": "Hình đẹp quá!" }\`
  - Chỉ dành cho người dùng đã xác thực.

- **Get Thông Tin User**: \`GET /localhost:8080/user/get-profile/:userId\`
  - Chỉ dành cho người dùng đã xác thực.

- **Get Danh Sách Ảnh Đã Lưu Theo UserId**: \`GET /localhost:8080/user/saved-picture/:userId\`
  - Chỉ dành cho người dùng đã xác thực.

- **Get Danh Sách Ảnh Đã Tạo Theo UserId**: \`GET /localhost:8080/user/created-picture/:userId\`
  - Chỉ dành cho người dùng đã xác thực.

- **Put Thông Tin Cá Nhân Của User**: \`Put /localhost:8080/user/update-profile/:userId\`
  - Request Body (form-data):
    - `email`: "newemail@example.com" (optional)
    - `password`: "newpassword" (optional)
    - `username`: "New Username" (optional)
    - `age`: 30 (optional)
    - `avtImg`: <image_file> (optional)
  - Chỉ dành cho người dùng đã xác thực.

## Cài Đặt

1. **Clone repository**:
   \`\`\`bash
   git clone <repository_url>
   cd <repository_folder>
   \`\`\`

2. **Cài đặt các dependencies**:
   \`\`\`bash
   yarn install
   \`\`\`

3. **Cấu hình cơ sở dữ liệu**:
   - Thiết lập cơ sở dữ liệu MySQL của bạn.
   - Cập nhật cấu hình cơ sở dữ liệu trong \`src/config/config.js\`.

4. **Chạy migrations và seeders**:
   \`\`\`bash
   yarn sequelize db:migrate
   yarn sequelize db:seed:all
   \`\`\`

5. **Khởi động server**:
   \`\`\`bash
   yarn start
   \`\`\`

### Middleware

- **Middleware Xác Thực Token**:
  - Bảo vệ các tuyến đường bằng cách xác thực JWT token.
  - Đảm bảo chỉ có người dùng đã xác thực mới có thể thực hiện các hành động như bình luận hoặc xóa hình ảnh.

## Cấu Trúc Dự Án

- \`src/models/\`: Các model Sequelize cho cơ sở dữ liệu.
- \`src/controllers/\`: Các controller xử lý logic nghiệp vụ.
- \`src/routes/\`: Định nghĩa các tuyến đường API.
- \`src/config/\`: Các tập tin cấu hình cho dự án, bao gồm cấu hình cơ sở dữ liệu và JWT.