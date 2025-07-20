import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface IssueDetailsPageProps {
  params: {
    id: string;
  };
}

const isValidObjectId = (id: string) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex direction={"column"} gap={"4"}>
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailsPage;
