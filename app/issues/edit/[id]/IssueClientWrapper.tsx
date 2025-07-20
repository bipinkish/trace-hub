"use client";

import dynamic from "next/dynamic";
import type { Issue } from "@prisma/client";
import IssueFormSkeleton from "./loading";

// Dynamically import the real form with client-only rendering
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

export default function IssueClientWrapper({ issue }: Props) {
  return <IssueForm issue={issue} />;
}
