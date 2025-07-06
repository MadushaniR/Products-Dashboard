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
    selectedProducts,
    selectedProductsToRender,
  } = useSelector((state) => state.product);

  const prevCategoryRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (prevCategoryRef.current && prevCategoryRef.current !== selectedCategory) {
      dispatch(toggleShowColumn(false));
    }
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory, dispatch]);

  const pieData = (() => {
    if (selectedProducts.length > 0) {
      return selectedProducts.map((id, index) => {
        const product = data.find((p) => p.id.toString() === id);
        return {
          name: product?.title || 'Unknown',
          value: product?.price || 0,
          color: COLORS[index % COLORS.length],
        };
      });
    }

    // Default: category breakdown
    const map = new Map();
    data.forEach((item) => {
      map.set(item.category, (map.get(item.category) || 0) + 1);
    });

    return Array.from(map, ([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));
  })();

  const selectedCategoryColor = selectedCategory
    ? COLORS[categories.indexOf(selectedCategory) % COLORS.length]
    : null;

  const columnData = selectedProductsToRender.map((id) => {
    const p = data.find((d) => d.id.toString() === id);
    return {
      name: p?.title || 'Unknown',
      value: p?.price || 0,
      color: selectedCategoryColor,
    };
  });

  return (
    <DashboardTemplate
      pieData={pieData}
      columnData={columnData}
      selectedCategoryColor={selectedCategoryColor}
    />
  );
}
