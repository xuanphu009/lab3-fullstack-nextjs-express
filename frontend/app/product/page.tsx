'use client';
import { useState, useEffect } from 'react';
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
    const res = await api.get('/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/products', { name, price });
      setName('');
      setPrice('');
      fetchProducts();
    } catch (err: any) {
      console.error(err.response?.data?.error);
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
        />
        <input
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
          className="border rounded px-3 py-2"
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
          <div key={p.id} className="border rounded p-3">
            {p.name} — {p.price.toLocaleString()}đ
          </div>
        ))}
      </div>
    </div>
  );
}