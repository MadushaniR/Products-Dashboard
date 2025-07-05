import { Box, Button } from '@chakra-ui/react';
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
  const { data, categories, selectedCategory, selectedProducts, hasRunReport } =
    useSelector((state) => state.product);

  const filteredProducts = selectedCategory
    ? data.filter((p) => p.category === selectedCategory)
    : [];

  const handleRunReport = () => {
    dispatch(setSelectedProductsToRender(selectedProducts));
    dispatch(toggleShowColumn(true));
    dispatch(setHasRunReport(true));
  };

  const isRunDisabled =
    (selectedCategory === '' && selectedProducts.length === 0) || hasRunReport;

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md" w="300px">
      <CategoryFilter
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        onClear={() => dispatch(setCategory(''))}
        categories={categories}
      />

      <ProductCheckboxGroup
        products={filteredProducts}
        selected={selectedProducts}
        onChange={(values) => dispatch(setSelectedProducts(values))}
      />

      <Box mb={2}>
        <Button
          size="sm"
          variant="link"
          onClick={() => dispatch(setSelectedProducts([]))}
          isDisabled={selectedProducts.length === 0}
        >
          Clear Products
        </Button>
      </Box>

      <PrimaryButton onClick={handleRunReport} isDisabled={isRunDisabled}>
        Run Report
      </PrimaryButton>

      <OutlineButton mt={2} onClick={() => dispatch(resetFilters())}>
        Reset All
      </OutlineButton>
    </Box>
  );
}
