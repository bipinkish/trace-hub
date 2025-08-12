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
import { Description } from "@radix-ui/themes/components/alert-dialog";
import { cache } from "react";

interface IssueDetailsPageProps {
  params: {
    id: string;
  };
}

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailsPage = async ({ params }: IssueDetailsPageProps) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!isValidObjectId(id)) {
    return notFound();
  }

  const issue = await fetchIssue(id);

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

export async function generateMetadata({ params }: IssueDetailsPageProps) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailsPage;
