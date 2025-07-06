import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import { fetchProducts, toggleShowColumn } from '../features/product/productSlice';
import COLORS from 'remoteApp/constants/chartColors';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    data,
    categories,
    selectedCategory,
    selectedProductsToRender,
  } = useSelector((state) => state.product);

  const prevCategoryRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (prevCategoryRef.current && prevCategoryRef.current !== selectedCategory) {
      // Hide column chart on category change
      dispatch(toggleShowColumn(false));
    }
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory, dispatch]);

  const pieData = categories.map((c, i) => ({
    name: c,
    value: data.filter((p) => p.category === c).length,
    color: COLORS[i % COLORS.length],
  }));

  const selectedCategoryColor = selectedCategory
    ? COLORS[categories.indexOf(selectedCategory) % COLORS.length]
    : null;

  const columnData = selectedProductsToRender.map((title) => ({
    name: title,
    value: data.find((d) => d.title === title)?.price || 0,
    color: selectedCategoryColor,
  }));

  return <DashboardTemplate pieData={pieData} columnData={columnData} />;
}
