import z from "zod";
import { isValidObjectId } from "./utils/utils";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(65535, "Title must be less than 255 characters"),
  description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(65535, "Title must be less than 255 characters")
    .optional(),

  description: z.string().min(1, "Description is required").optional(),

  assignedToId: z
    .string()
    .min(1, "Assigned to User Id is required")
    .max(255)
    .refine(isValidObjectId, {
      message: "Invalid User",
    })
    .optional()
    .nullable(),
});
