import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import delay from "delay";

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
  await delay(2000);
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" className="my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetailsPage;
