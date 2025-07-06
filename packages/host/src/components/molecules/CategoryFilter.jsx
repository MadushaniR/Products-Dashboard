import { Flex, FormControl } from '@chakra-ui/react';
import CategorySelect from '../atoms/CategorySelect';
import OutlineButton from '../atoms/OutlineButton';
import HeadingText from '../atoms/HeadingText';

export default function CategoryFilter({ value, onChange, categories, onClear }) {
  return (
    <FormControl mb={4}>
      <Flex justify="space-between" align="center" mb={1}>
        <HeadingText as="formlabel" mb={0} fontSize="md">
          Please Select a Category
        </HeadingText>
        {value && (
          <OutlineButton size="sm" onClick={onClear} px={3} w="auto">
            Clear
          </OutlineButton>
        )}
      </Flex>
      <CategorySelect value={value} onChange={onChange} categories={categories} />
    </FormControl>
  );
}
