'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(console.log);
  }, []);

  return <div>Test CORS - Xem Console DevTools</div>;
}