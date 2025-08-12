import { IssueStatusBadge } from "@/app/components";
import { Issue, IssueStatus } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";

interface SearchParams {
  status: IssueStatus;
  orderBy: keyof Issue;
  sortDir: string;
}
interface Props {
  searchParams: SearchParams;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const { status, orderBy, sortDir } = await searchParams;

  return (
    <Table.Root variant="surface" className="w-full">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.label}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    status,
                    orderBy: column.value,
                    sortDir:
                      column.value === orderBy
                        ? sortDir === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === orderBy ? (
                sortDir === "asc" ? (
                  <ArrowUpIcon className="inline" />
                ) : (
                  <ArrowDownIcon className="inline" />
                )
              ) : null}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">{issue.status}</div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
