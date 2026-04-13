# Lab 3 — Fullstack Integration: NextJS + Express

## Mô tả
Ứng dụng quản lý sản phẩm fullstack kết nối NextJS (frontend) với Express (backend).

## Tính năng đã hoàn thành
- [x] Backend Express với 3 route: GET / POST / DELETE /api/products
- [x] Cấu hình CORS và Proxy rewrites trong NextJS
- [x] Form thêm sản phẩm gửi lên POST API
- [x] Xóa sản phẩm với optimistic update
- [x] Toast notification (thành công, lỗi, loading)
- [x] Axios với file cấu hình trung tâm (lib/api.ts)

## Cách chạy

### Backend
```bash
cd backend
node server.js
```

### Frontend
```bash
cd frontend
npm run dev
```

Truy cập: http://localhost:3000/products

## Cấu trúc dự án
```
fullstack-shop/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   └── products/
    │       └── page.tsx
    ├── lib/
    │   └── api.ts
    └── next.config.ts
```