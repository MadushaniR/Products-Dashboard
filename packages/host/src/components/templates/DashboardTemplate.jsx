import { Box, Heading, Text } from '@chakra-ui/react';
import FilterPanel from '../organisms/FilterPanel';
import ProductPieChart from 'remoteApp/ProductPieChart';
import ColumnChart from 'remoteApp/ColumnChart';
import { useSelector } from 'react-redux';

export default function DashboardTemplate({ pieData, columnData }) {
  const { showColumn, selectedCategory } = useSelector((state) => state.product);

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
            <ColumnChart data={columnData} category={selectedCategory} />
          </>
        )}
      </Box>
    </Box>
  );
}
