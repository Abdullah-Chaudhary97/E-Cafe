import React, { useEffect, useState } from 'react';
import { productAPI } from '../../api';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../common/Toast/Toast';
import Loading from '../common/Loading/Loading';
import MenuCategoryTemplate from './MenuCategoryTemplate';

export default function Tea() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProductsByCategory('tea');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching tea products:', err);
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
        category: 'tea',
        title: product.productTitle || product.title,
      });
      showToast(`${product.productTitle || product.title} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  if (loading) return <Loading message="Loading tea menu..." />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <MenuCategoryTemplate
      title="Tea Menu"
      subtitle="Explore our premium collection of fine teas from around the world"
      products={products}
      category="tea"
      onAddToCart={handleAddToCart}
    />
  );
}
