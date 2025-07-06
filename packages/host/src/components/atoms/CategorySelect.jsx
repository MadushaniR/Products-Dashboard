import { FormControl, Select } from '@chakra-ui/react';

export default function CategorySelect({ value, onChange, categories }) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <FormControl>
      <Select
        placeholder="Select a Category"
        value={value}
        onChange={onChange}
        borderColor={value ? 'blue.500' : 'gray.200'}
        _hover={{ borderColor: 'blue.400' }}
        _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
        mb={2}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {capitalize(c)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
