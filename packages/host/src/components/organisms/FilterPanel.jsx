import {
  Box,
  Button,
  Select,
  Text,
  VStack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setSelectedProducts,
  toggleShowColumn,
  resetFilters,
  setHasRunReport,
  setSelectedProductsToRender,
} from '../../features/product/productSlice';

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

  const isRunDisabled =
    (selectedCategory === '' && selectedProducts.length === 0) || hasRunReport;

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md" w="300px">
      <Text fontSize="xl" mb={4}>Filter Panel</Text>

      <Select
        placeholder="Select Category"
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        mb={2}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <Button
        size="sm"
        mb={4}
        variant="link"
        onClick={() => dispatch(setCategory(''))}
        isDisabled={!selectedCategory}
      >
        Clear Category
      </Button>

      <CheckboxGroup
        value={selectedProducts}
        onChange={(values) => dispatch(setSelectedProducts(values))}
      >
        <VStack align="start" spacing={2} mb={2}>
          {selectedCategory &&
            filteredProducts.map((p) => (
              <Checkbox key={p.id} value={p.title}>
                {p.title}
              </Checkbox>
            ))}
        </VStack>
      </CheckboxGroup>

      <Button
        size="sm"
        mb={4}
        variant="link"
        onClick={() => dispatch(setSelectedProducts([]))}
        isDisabled={selectedProducts.length === 0}
      >
        Clear Products
      </Button>

      <Button
        colorScheme="teal"
        w="100%"
        onClick={handleRunReport}
        isDisabled={isRunDisabled}
      >
        Run Report
      </Button>

      <Button
        mt={2}
        variant="outline"
        colorScheme="red"
        w="100%"
        onClick={() => dispatch(resetFilters())}
      >
        Reset All
      </Button>
    </Box>
  );
}
