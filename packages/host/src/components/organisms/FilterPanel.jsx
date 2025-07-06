import { Box, Text, VStack, Fade } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setSelectedProducts,
  toggleShowColumn,
  resetFilters,
  setHasRunReport,
  setSelectedProductsToRender,
} from '../../features/product/productSlice';
import CategoryFilter from '../molecules/CategoryFilter';
import ProductCheckboxGroup from '../molecules/ProductCheckboxGroup';
import PrimaryButton from '../atoms/PrimaryButton';
import OutlineButton from '../atoms/OutlineButton';

export default function FilterPanel() {
  const dispatch = useDispatch();

  // Extract relevant state from Redux store
  const { data, categories, selectedCategory, selectedProducts, hasRunReport } =
    useSelector(s => s.product);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? data.filter(p => p.category === selectedCategory)
    : [];

  // Handler for running the report
  const handleRun = () => {
    // Set products to render, show columns, and mark report as run
    dispatch(setSelectedProductsToRender(selectedProducts));
    dispatch(toggleShowColumn(true));
    dispatch(setHasRunReport(true));
  };

  // Disable Run button if no products selected or report already run
  const runDisabled = selectedProducts.length === 0 || hasRunReport;

  return (
    <Box p={6} borderRadius="lg" w="320px">
      {/* Panel heading */}
      <Text fontSize="3xl" fontWeight="bold" mb={4} pb={2} borderBottom="2px solid" borderColor="gray.200">
        Filters
      </Text>

      <VStack align="stretch" spacing={4}>
        {/* Category dropdown filter */}
        <CategoryFilter
          value={selectedCategory}
          onChange={e => dispatch(setCategory(e.target.value))}
          categories={categories}
          onClear={() => dispatch(setCategory(''))}
        />

        {/* Checkbox group for products under selected category */}
        <ProductCheckboxGroup
          products={filteredProducts}
          selected={selectedProducts}
          onChange={vals => dispatch(setSelectedProducts(vals))}
          onClear={() => dispatch(setSelectedProducts([]))}
          show={Boolean(selectedCategory)}
        />

        {/* Run Report button with fade-in effect */}
        <Fade in>
          <PrimaryButton onClick={handleRun} isDisabled={runDisabled}>
            Run Report
          </PrimaryButton>
        </Fade>

        {/* Reset all filters button */}
        <OutlineButton onClick={() => dispatch(resetFilters())}>Reset All</OutlineButton>
      </VStack>
    </Box>
  );
}
