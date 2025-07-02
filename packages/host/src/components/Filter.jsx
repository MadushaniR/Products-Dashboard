import { Select, Button, Box, Text } from '@chakra-ui/react';

export default function FilterPanel({
  category,
  setCategory,
  selectedProducts,
  setSelectedProducts,
  allData,
}) {
  const categories = [...new Set(allData.map((d) => d.category))];
  const products = [...new Set(allData.filter((d) => d.category === category).map((d) => d.name))];

  return (
    <Box p={4} border="1px solid #ccc">
      <Text fontSize="2xl" mb={4}>Filters</Text>
      <Select placeholder="Select Category" value={category} onChange={(e) => {
        setCategory(e.target.value);
        setSelectedProducts([]); // Reset products on category change
      }}>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </Select>

      <Select
        mt={3}
        placeholder="Select Product(s)"
        value={selectedProducts}
        onChange={(e) =>
          setSelectedProducts([...e.target.selectedOptions].map((opt) => opt.value))
        }
        multiple
        isDisabled={!category}
      >
        {products.map((prod) => <option key={prod} value={prod}>{prod}</option>)}
      </Select>

      <Button mt={4} colorScheme="blue" width="100%" onClick={() => {}}>
        RUN REPORT
      </Button>
    </Box>
  );
}
