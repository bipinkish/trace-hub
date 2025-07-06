import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueToolBar = () => {
  return (
    <Box className="mb-5">
      <Button variant="solid" size="2">
        <Link href={"/issues/new"}> New Issue</Link>
      </Button>
    </Box>
  );
};

export default IssueToolBar;
