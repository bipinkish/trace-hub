import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { isValidObjectId } from "@/app/utils/utils";

interface IssueDetailsPageProps {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const session = await getServerSession(authOptions);
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
      {session && (
        <Flex direction={"column"} gap={"4"}>
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailsPage;
