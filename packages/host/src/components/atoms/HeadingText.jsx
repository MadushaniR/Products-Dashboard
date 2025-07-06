import { FormLabel, Text } from '@chakra-ui/react';

export default function HeadingText({
  as = 'text',
  children,
  mb = 4,
  fontSize,
  fontWeight = 'semibold',
  ...rest
}) {
  if (as === 'formlabel') {
    return (
      <FormLabel
        fontWeight={fontWeight}
        mb={mb}
        fontSize={fontSize || 'sm'}
        {...rest}
      >
        {children}
      </FormLabel>
    );
  }

  return (
    <Text
      fontWeight={fontWeight}
      mb={mb}
      fontSize={fontSize || 'md'}
      {...rest}
    >
      {children}
    </Text>
  );
}
