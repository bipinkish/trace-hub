import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Issue, IssueStatus } from "@prisma/client";
import IssueTable, { columnNames } from "./IssueTable";
import IssueToolBar from "./IssueToolBar";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: IssueStatus;
    orderBy: keyof Issue;
    page: string;
    sortDir: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy, page, sortDir } = await searchParams;
  const statuses = Object.values(IssueStatus);
  const validStatus = statuses.includes(status) ? status : undefined;
  const where = { status: validStatus };
  const validOrderBy = columnNames.includes(orderBy)
    ? { [orderBy]: sortDir }
    : undefined;

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  const take = pageSize;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: validOrderBy,
    skip,
    take,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction={"column"} gap="4">
      <IssueToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "TraceHub - Issues",
  description:
    "Dashboard for TraceHub, showcasing issue statistics and latest updates.",
};
