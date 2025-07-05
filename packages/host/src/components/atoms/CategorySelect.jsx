import { Select } from '@chakra-ui/react';

export default function CategorySelect({ value, onChange, categories }) {
  return (
    <Select
      placeholder="Select Category"
      value={value}
      onChange={onChange}
      mb={2}
    >
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </Select>
  );
}
