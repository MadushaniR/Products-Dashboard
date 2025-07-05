import { Button, Box } from '@chakra-ui/react';
import CategorySelect from '../atoms/CategorySelect';

export default function CategoryFilter({ value, onChange, onClear, categories }) {
  return (
    <Box mb={4}>
      <CategorySelect value={value} onChange={onChange} categories={categories} />
      <Button size="sm" variant="link" onClick={onClear} isDisabled={!value}>
        Clear Category
      </Button>
    </Box>
  );
}
