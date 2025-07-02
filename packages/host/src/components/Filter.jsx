import { Box, Button, MenuItem, Select, TextField, Typography, Stack } from '@mui/material';
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
    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Filter Products
      </Typography>
      <Stack spacing={2}>
        <Select
          displayEmpty
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          <MenuItem value="books">Books</MenuItem>
        </Select>

        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />

        <Button variant="contained" color="primary" onClick={handleFilter}>
          Apply Filter
        </Button>
      </Stack>
    </Box>
  );
}
