import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueClientWrapper from "./IssueClientWrapper";
import { Metadata } from "next";

interface EditIssuePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue) return notFound();

  return <IssueClientWrapper issue={issue} />;
}

export const metadata: Metadata = {
  title: "TraceHub - Edit Issue",
  description: "Edit an existing issue in TraceHub.",
};
