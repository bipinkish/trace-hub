import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  return (
    <Flex gap={"1"} align={"center"}>
      <Text size={"2"}>
        Page {currentPage} of {pageCount}
      </Text>
      <Button variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === pageCount}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
