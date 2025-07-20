import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueClientWrapper from "./IssueClientWrapper";

interface EditIssuePageProps {
  params: { id: string };
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue) return notFound();

  return <IssueClientWrapper issue={issue} />;
}
