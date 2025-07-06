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
  const {
    data,
    categories,
    selectedCategory,
    selectedProducts,
    hasRunReport,
  } = useSelector((state) => state.product);

  const filteredProducts = selectedCategory
    ? data.filter((p) => p.category === selectedCategory)
    : [];

  const handleRunReport = () => {
    dispatch(setSelectedProductsToRender(selectedProducts));
    dispatch(toggleShowColumn(true));
    dispatch(setHasRunReport(true));
  };

  const isRunDisabled = selectedProducts.length === 0 || hasRunReport;

  return (
    <Box
      p={6}
      borderRadius="lg"
      w="320px"
      transition="all 0.3s ease"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={4}
        borderBottom="2px solid"
        borderColor="gray.200"
        pb={2}
      >
        Filters
      </Text>

      <VStack align="stretch" spacing={4}>
        <CategoryFilter
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          categories={categories}
          onClear={() => dispatch(setCategory(''))}
        />

        <ProductCheckboxGroup
          products={filteredProducts}
          selected={selectedProducts}
          onChange={(values) => dispatch(setSelectedProducts(values))}
          onClear={() => dispatch(setSelectedProducts([]))}
          show={Boolean(selectedCategory)}
        />

        <Fade in>
          <PrimaryButton onClick={handleRunReport} isDisabled={isRunDisabled}>
            Run Report
          </PrimaryButton>
        </Fade>

        <OutlineButton mt={2} onClick={() => dispatch(resetFilters())}>
          Reset All
        </OutlineButton>
      </VStack>
    </Box>
  );
}
