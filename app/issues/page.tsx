import React from "react";
import { Box, Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <Box className="mb-5">
        <Button variant="solid" size="2">
          <Link href={"/issues/new"}> New Issue</Link>
        </Button>
      </Box>
      <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="block md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell>{issue.description}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesPage;
