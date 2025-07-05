import { Checkbox, CheckboxGroup, VStack } from '@chakra-ui/react';

export default function ProductCheckboxGroup({ products, selected, onChange }) {
  return (
    <CheckboxGroup value={selected} onChange={onChange}>
      <VStack align="start" spacing={2} mb={2}>
        {products.map((p) => (
          <Checkbox key={p.id} value={p.title}>
            {p.title}
          </Checkbox>
        ))}
      </VStack>
    </CheckboxGroup>
  );
}
