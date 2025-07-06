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

  // Keep track of previous category to detect changes
  const prevCategoryRef = useRef();

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // When selected category changes, hide columns (reset view)
  useEffect(() => {
    if (prevCategoryRef.current && prevCategoryRef.current !== selectedCategory) {
      dispatch(toggleShowColumn(false));
    }
    prevCategoryRef.current = selectedCategory;
  }, [selectedCategory, dispatch]);

  // Prepare pie chart data
  const pieData = (() => {
    if (selectedProducts.length > 0) {
      // Show pie slices for selected products with assigned colors
      return selectedProducts.map((id, index) => {
        const product = data.find((p) => p.id.toString() === id);
        return {
          name: product?.title || 'Unknown',
          value: product?.price || 0,
          color: COLORS[index % COLORS.length],
        };
      });
    }

    // Default pie chart: count of products per category
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

  // Determine color for selected category
  const selectedCategoryColor = selectedCategory
    ? COLORS[categories.indexOf(selectedCategory) % COLORS.length]
    : null;

  // Prepare column chart data for selected products to render
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
