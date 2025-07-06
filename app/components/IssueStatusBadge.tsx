import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface IssueStatusBadgeProps {
  status: IssueStatus;
}

const statusMap: Record<
  IssueStatus,
  { label: string; color: "red" | "yellow" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: IssueStatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
