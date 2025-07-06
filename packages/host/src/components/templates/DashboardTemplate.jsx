import { Box, Flex } from "@chakra-ui/react";
import FilterPanel from "../organisms/FilterPanel";
import ProductPieChart from "remoteApp/ProductPieChart";
import ColumnChart from "remoteApp/ColumnChart";
import { useSelector } from "react-redux";
import HeadingText from "../atoms/HeadingText";

export default function DashboardTemplate({
  pieData,
  columnData,
  selectedCategoryColor,
}) {
  const { showColumn, selectedCategory } = useSelector(
    (state) => state.product
  );

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      p={{ base: 4, md: 6 }}
      gap={{ base: 4, md: 6 }}
      bg="#f0f4f8"
      minHeight="100vh"
    >
      {/* Sidebar Filter */}
      <Box bg="white" borderRadius="md" p={4} boxShadow="sm">
        <FilterPanel />
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        bg="white"
        borderRadius="md"
        p={{ base: 4, md: 6 }}
        boxShadow="md"
        overflowX="hidden"
      >
        <HeadingText as="formlabel" mb={2} fontSize="md">
          Products in Selected Category
        </HeadingText>

        {/* Pie Chart - Centered */}
        <Flex justify="center" align="center" w="100%">
          <Box maxW={{ base: "100%", md: "80%", lg: "60%" }} w="100%">
            <ProductPieChart data={pieData} />
          </Box>
        </Flex>

        {/* Column Chart - Scrollable and Centered */}
        {showColumn && (
          <>
            <HeadingText
              mt={{ base: 6, md: 8 }}
              mb={2}
              fontWeight="semibold"
              fontSize="md"
              textAlign="left"
            >
              Selected Product Prices
            </HeadingText>

            <Flex
              justify="center"
              align="center"
              w="100%"
              overflowX="auto"
              px={2}
            >
              <Box
                minWidth={`${Math.max(columnData.length * 80, 600)}px`}
                pr={4}
              >
                <ColumnChart
                  data={columnData}
                  category={selectedCategory}
                  legendColor={selectedCategoryColor}
                />
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </Flex>
  );
}
