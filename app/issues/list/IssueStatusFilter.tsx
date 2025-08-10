"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "ALL"}
      onValueChange={(status) => {
        const paramms = new URLSearchParams();
        if (status && status != "ALL") paramms.append("status", status);
        if (searchParams.get("orderBy")) {
          paramms.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = paramms.size ? "?" + paramms.toString() : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Select any status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
