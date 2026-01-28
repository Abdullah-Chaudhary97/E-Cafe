import React, { useEffect, useState } from 'react';
import { productAPI } from '../../api';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../common/Toast/Toast';
import Loading from '../common/Loading/Loading';
import MenuCategoryTemplate from './MenuCategoryTemplate';

export default function Coffee() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProductsByCategory('coffee');
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching coffee products:', err);
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
        category: 'coffee',
        title: product.productTitle || product.title,
      });
      showToast(`${product.productTitle || product.title} added to cart!`, 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  if (loading) return <Loading message="Loading coffee menu..." />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <MenuCategoryTemplate
      title="Coffee Menu"
      subtitle="Discover our premium selection of handcrafted coffee beverages"
      products={products}
      category="coffee"
      onAddToCart={handleAddToCart}
    />
  );
}
