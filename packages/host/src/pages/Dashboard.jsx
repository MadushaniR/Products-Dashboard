import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Heading } from '@chakra-ui/react';
import FilterPanel from '../components/organisms/FilterPanel';
import { fetchProducts } from '../features/product/productSlice';
import ProductPieChart from 'remoteApp/ProductPieChart';
import ColumnChart from 'remoteApp/ColumnChart';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    data,
    categories,
    selectedCategory,
    selectedProducts,
    selectedProductsToRender,
    showColumn,
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

  return (
    <Box display="flex" p={6} gap={6} bg="#f0f4f8" minHeight="100vh">
      <FilterPanel />

      <Box flex="1" bg="white" borderRadius="md" p={6} boxShadow="md">
        <Heading size="lg" mb={4}>Dashboard</Heading>
        <Text mb={4}>Overview</Text>
        <ProductPieChart data={pieData} />
        {showColumn && (
          <>
            <Text mt={6} mb={2}>Selected Product Prices</Text>
            <ColumnChart data={columnData} />
          </>
        )}
      </Box>
    </Box>
  );
}
