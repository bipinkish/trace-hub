import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueToolBar = () => {
  return (
    <Flex mb={"5"} justify={"between"}>
      <IssueStatusFilter />
      <Button variant="solid" size="2">
        <Link href={"/issues/new"}> New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueToolBar;
