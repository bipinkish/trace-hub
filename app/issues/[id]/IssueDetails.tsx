import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import StatusSelect from "./StatusSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" className="my-2" align={"center"}>
        <StatusSelect issue={issue} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetails;
