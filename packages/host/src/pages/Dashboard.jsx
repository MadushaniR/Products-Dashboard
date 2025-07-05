// pages/Dashboard.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import { fetchProducts } from '../features/product/productSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    data,
    categories,
    selectedCategory,
    selectedProducts,
    selectedProductsToRender,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = data.filter((p) => p.category === selectedCategory);

  let pieData;
  if (!selectedCategory) {
    pieData = categories.map((c) => ({
      name: c,
      value: data.filter((p) => p.category === c).length,
    }));
  } else if (selectedCategory && selectedProducts.length === 0) {
    pieData = [{ name: selectedCategory, value: filteredProducts.length }];
  } else {
    pieData = selectedProducts.map((title) => {
      const product = data.find((p) => p.title === title);
      return { name: title, value: product?.price || 1 };
    });
  }

  const columnData = selectedProductsToRender.map((title) => ({
    name: title,
    value: data.find((d) => d.title === title)?.price || 0,
  }));

  return <DashboardTemplate pieData={pieData} columnData={columnData} />;
}
