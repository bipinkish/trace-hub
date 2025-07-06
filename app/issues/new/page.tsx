"use client";

import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import z from "zod";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createIssueSchema } from "@/app/validationSchemas";
import "easymde/dist/easymde.min.css";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <Box className="max-w-xl">
      <Skeleton height="20rem" />
    </Box>
  ),
});

const NewIssuePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch {
      setError("Failed to create issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type="submit" size="2">
          Submit New Issue {isSubmitting && <Spinner size="2" />}
        </Button>
      </form>
    </Box>
  );
};

export default NewIssuePage;
