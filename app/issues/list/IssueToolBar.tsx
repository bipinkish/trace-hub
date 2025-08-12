"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Suspense } from "react";

const IssueToolBar = () => {
  return (
    <Flex justify={"between"}>
      <Suspense fallback={<div>Loading filters...</div>}>
        <IssueStatusFilter />
      </Suspense>
      <Button variant="solid" size="2">
        <Link href={"/issues/new"}> New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueToolBar;
