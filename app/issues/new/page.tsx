"use client";

import dynamic from "next/dynamic";
import { Box, Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => (
  <Box className="max-w-xl space-y-3">
    <TextField.Root placeholder="Title"></TextField.Root>{" "}
    <SimpleMDE placeholder="Description" />
    <Button>Submit New Issue</Button>
  </Box>
);

export default NewIssuePage;
