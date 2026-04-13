'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/api/products');
      setProducts(res.data);
    } catch {
      toast.error('Không thể kết nối server!');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      api.post('/api/products', { name, price }).then(() => {
        setName('');
        setPrice('');
        fetchProducts();
      }),
      {
        loading: 'Đang lưu...',
        success: 'Thêm sản phẩm thành công!',
        error: (err) => err.response?.data?.error || 'Có lỗi xảy ra!',
      }
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xoá?')) return;
    try {
      await api.delete(`/api/products/${id}`);
      // Optimistic update: cập nhật state ngay, không cần gọi lại API
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Đã xoá sản phẩm', { icon: '🗑️' });
    } catch {
      toast.error('Xoá thất bại, thử lại!');
      fetchProducts(); // rollback
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Tên sản phẩm"
          className="border rounded px-3 py-2"
          required
        />
        <input
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {products.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center p-3 border rounded mb-2"
          >
            <span>
              {p.name} — {p.price.toLocaleString()}đ
            </span>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}