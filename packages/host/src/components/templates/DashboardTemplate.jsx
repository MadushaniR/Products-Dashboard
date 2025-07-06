import { Box, Flex } from "@chakra-ui/react";
import FilterPanel from "../organisms/FilterPanel";
import ProductPieChart from "remoteApp/ProductPieChart";
import ColumnChart from "remoteApp/ColumnChart";
import HeadingText from "../atoms/HeadingText";
import { useSelector } from "react-redux";

export default function DashboardTemplate({ pieData, columnData, selectedCategoryColor }) {
  const { showColumn } = useSelector(s => s.product);

  return (
    <Flex direction={{ base: "column", lg: "row" }} p={{ base: 4, md: 6 }} gap={{ base: 4, md: 6 }} bg="#f0f4f8" minH="100vh">
      <Box bg="white" borderRadius="md" p={4} boxShadow="sm">
        <FilterPanel />
      </Box>

      <Box flex="1" bg="white" borderRadius="md" p={{ base: 4, md: 6 }} boxShadow="md" overflowX="hidden">
        <HeadingText as="formlabel" mb={2} fontSize="md">
          Products Overview
        </HeadingText>

        <Flex justify="center" align="center" w="100%">
          <Box maxW={{ base: "100%", md: "80%", lg: "60%" }} w="100%">
            <ProductPieChart data={pieData} />
          </Box>
        </Flex>

        {showColumn && (
          <>
            <HeadingText mt={8} mb={2} fontSize="md" fontWeight="semibold">
              Selected Product Prices
            </HeadingText>
            <Flex justify="center" overflowX="auto" px={2}>
              <Box minW={`${Math.max(columnData.length * 80, 600)}px`} pr={4}>
                <ColumnChart data={columnData} legendColor={selectedCategoryColor} />
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
}
