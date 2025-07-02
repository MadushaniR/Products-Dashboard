import { useEffect, useState } from "react";
import { ChakraProvider, Box, Button, Select, Text, Stack, Heading } from "@chakra-ui/react";
import ProductPieChart from "remoteApp/ProductPieChart";
import ColumnChart from "remoteApp/ColumnChart";

export default function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showColumn, setShowColumn] = useState(false);

  // Fetch data from correct endpoint
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json.products || []);
        const uniqueCategories = [...new Set(json.products.map((p) => p.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  // Products in the selected category
  const filteredProducts = selectedCategory
    ? data.filter((p) => p.category === selectedCategory)
    : [];

  // Pie chart data (category-wise counts)
  const pieData = categories.map((c) => ({
    name: c,
    value: data.filter((p) => p.category === c).length,
  }));

  // Column chart data (selected product prices)
  const columnData = selectedProducts.map((p) => ({
    name: p,
    value: data.find((d) => d.title === p)?.price || 0,
  }));

  // Reset filter selections
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
    setShowColumn(false);
  };

  // Control Run Report button
  const canRunReport = selectedCategory && selectedProducts.length > 0;

  return (
    <ChakraProvider>
      <Box display="flex" p="4" minHeight="100vh" bg="#f0f4f8">
        {/* Sidebar Filters */}
        <Box width="320px" p="6" bg="white" borderRadius="md" boxShadow="md" mr="6">
          <Heading size="md" mb="4" color="teal.600">Filter Products</Heading>
          <Button variant="link" colorScheme="red" mb="4" onClick={resetFilters}>
            Clear All
          </Button>

          <Stack spacing={4}>
            {/* Category Selector */}
            <Select
              placeholder="Select Category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedProducts([]);
                setShowColumn(false);
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>

            {/* Product Selector */}
            <Select
              placeholder="Select Products"
              value={selectedProducts}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                setSelectedProducts(options);
              }}
              isDisabled={!selectedCategory}
              multiple
              size="md"
              height="150px"
            >
              {filteredProducts.map((p) => (
                <option key={p.id} value={p.title}>{p.title}</option>
              ))}
            </Select>

            {/* Run Report Button */}
            <Button
              colorScheme="teal"
              onClick={() => setShowColumn(true)}
              isDisabled={!canRunReport || showColumn}
            >
              Run Report
            </Button>
          </Stack>
        </Box>

        {/* Main Dashboard */}
        <Box flex="1" p="6" bg="white" borderRadius="md" boxShadow="md">
          <Heading size="lg" mb="6" color="teal.700">Product Dashboard</Heading>

          <Text fontSize="lg" mb="4">Product Categories Overview</Text>
          <ProductPieChart data={pieData} />

          {showColumn && (
            <Box mt="10">
              <Text fontSize="lg" mb="4">Selected Product Prices</Text>
              <ColumnChart data={columnData} />
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
