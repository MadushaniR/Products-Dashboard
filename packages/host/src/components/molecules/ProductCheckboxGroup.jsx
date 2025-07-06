import { Checkbox, CheckboxGroup, VStack, FormControl, Flex } from '@chakra-ui/react';
import OutlineButton from '../atoms/OutlineButton';
import HeadingText from '../atoms/HeadingText';

export default function ProductCheckboxGroup({
  products, selected, onChange, onClear, show,
}) {
  if (!show) return null;

  return (
    <FormControl mb={4}>
      <Flex justify="space-between" align="center" mb={1}>
        <HeadingText as="formlabel" mb={0} fontSize="md">
          Please Select Product(s)
        </HeadingText>
        {selected.length > 0 && (
          <OutlineButton size="sm" onClick={onClear} px={3} w="auto">
            Clear
          </OutlineButton>
        )}
      </Flex>

      <CheckboxGroup value={selected} onChange={onChange}>
        <VStack align="start" spacing={2}>
          {products.map(p => (
            <Checkbox key={p.id} value={p.id.toString()} colorScheme="teal">
              {p.title}
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
    </FormControl>
  );
}
