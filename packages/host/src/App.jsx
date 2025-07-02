import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Select,
  Text,
  Stack,
  Heading,
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import ProductPieChart from "remoteApp/ProductPieChart";
import ColumnChart from "remoteApp/ColumnChart";

export default function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showColumn, setShowColumn] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json.products || []);
        const uniqueCategories = [
          ...new Set(json.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  const filteredProducts = selectedCategory
    ? data.filter((p) => p.category === selectedCategory)
    : [];

  const pieData = categories.map((c) => ({
    name: c,
    value: data.filter((p) => p.category === c).length,
  }));

  const columnData = selectedProducts.map((title) => ({
    name: title,
    value: data.find((d) => d.title === title)?.price || 0,
  }));

  // Clear entire filter
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
    setShowColumn(false);
  };

  // Clear category selection (also resets products)
  const clearCategory = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
    setShowColumn(false);
  };

  // Clear selected products only
  const clearProducts = () => {
    setSelectedProducts([]);
    setShowColumn(false);
  };

  const canRunReport = selectedCategory && selectedProducts.length > 0;

  return (
    <ChakraProvider>
      <Box display="flex" p="4" minHeight="100vh" bg="#f0f4f8">
        {/* Sidebar Filters */}
        <Box
          width="320px"
          p="6"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          mr="6"
          display="flex"
          flexDirection="column"
        >
          <Heading size="md" mb="4" color="teal.600">
            Filter Products
          </Heading>
          <Button variant="link" colorScheme="red" mb="4" onClick={resetFilters}>
            Clear All
          </Button>

          <Stack spacing={4} flex="1" overflow="auto">
            {/* Category Selector with label + clear button */}
            <Box>
              <HStack justifyContent="space-between" mb="1">
                <Text fontWeight="semibold" color="gray.700">
                  Select Category
                </Text>
                {selectedCategory && (
                  <Tooltip label="Clear category">
                    <IconButton
                      size="sm"
                      aria-label="Clear category"
                      icon={<CloseIcon />}
                      onClick={clearCategory}
                      variant="ghost"
                    />
                  </Tooltip>
                )}
              </HStack>
              <Select
                placeholder="Select Category"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedProducts([]);
                  setShowColumn(false);
                }}
                height="40px"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Product Selector with label + clear button */}
            <Box>
              <HStack justifyContent="space-between" mb="1">
                <Text fontWeight="semibold" color="gray.700">
                  Select Product
                </Text>
                {selectedProducts.length > 0 && (
                  <Tooltip label="Clear selected products">
                    <IconButton
                      size="sm"
                      aria-label="Clear selected products"
                      icon={<CloseIcon />}
                      onClick={clearProducts}
                      variant="ghost"
                      isDisabled={!selectedCategory}
                    />
                  </Tooltip>
                )}
              </HStack>
              <Box
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p="2"
                bg={selectedCategory ? "white" : "gray.100"}
                height={selectedCategory ? "auto" : "40px"}
                maxHeight={selectedCategory ? "200px" : "40px"}
                overflowY={selectedCategory ? "auto" : "hidden"}
                transition="height 0.3s ease"
              >
                <CheckboxGroup
                  colorScheme="teal"
                  value={selectedProducts}
                  onChange={(values) => {
                    setSelectedProducts(values);
                    setShowColumn(false);
                  }}
                  isDisabled={!selectedCategory}
                >
                  <VStack
                    align="start"
                    spacing={2}
                    maxHeight="160px"
                    overflowY="auto"
                  >
                    {filteredProducts.map((p) => (
                      <Checkbox key={p.id} value={p.title}>
                        {p.title}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>
            </Box>

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
          <Heading size="lg" mb="6" color="teal.700">
            Product Dashboard
          </Heading>

          <Text fontSize="lg" mb="4">
            Product Categories Overview
          </Text>
          <ProductPieChart data={pieData} />

          {showColumn && (
            <Box mt="10">
              <Text fontSize="lg" mb="4">
                Selected Product Prices
              </Text>
              <ColumnChart data={columnData} />
            </Box>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
