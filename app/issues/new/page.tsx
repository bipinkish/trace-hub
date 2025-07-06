"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Callout,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  console.log(register("title"));
  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("Failed to create issue. Please try again.");
          }
        })}
      >
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
