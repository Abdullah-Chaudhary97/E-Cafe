import React, { useEffect, useState } from 'react';
import { productAPI } from '../../api';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../common/Toast/Toast';
import Loading from '../common/Loading/Loading';
import MenuCategoryTemplate from './MenuCategoryTemplate';

export default function Desserts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProductsByCategory('desserts');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching desserts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart({
        ...product,
        category: 'desserts',
        title: product.productTitle || product.title,
      });
      showToast(`${product.productTitle || product.title} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  if (loading) return <Loading message="Loading desserts menu..." />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <MenuCategoryTemplate
      title="Desserts"
      subtitle="Indulge in our decadent selection of sweet treats"
      products={products}
      category="desserts"
      onAddToCart={handleAddToCart}
    />
  );
}
