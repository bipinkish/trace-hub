import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingIssueDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gap="3" className="my-2">
        <Skeleton width="5rem" />
        <Text>
          <Skeleton width="8rem" />
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailsPage;
