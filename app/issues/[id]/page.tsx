import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

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
    return notFound(); // or redirect, or show custom error page
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return notFound();
  }

  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" className="my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </Box>
  );
};

export default IssueDetailsPage;
