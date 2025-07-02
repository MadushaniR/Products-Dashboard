import { Box, Button, Select, Input, Text, Stack } from '@chakra-ui/react';
import { useState } from 'react';

export default function Filter({ onFilter }) {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ category, searchTerm });
    }
  };

  return (
    <Box border="1px solid #ccc" p={4} borderRadius="md" maxW="400px">
      <Text fontSize="lg" mb={4} fontWeight="bold">
        Filter Products
      </Text>
      <Stack spacing={3}>
        <Select
          placeholder="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </Select>

        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button colorScheme="blue" onClick={handleFilter}>
          Apply Filter
        </Button>
      </Stack>
    </Box>
  );
}
