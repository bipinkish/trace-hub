"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        console.log("S : " + status);
        const query = status && status != "ALL" ? `?status=${status}` : "";
        console.log("Q : " + query);
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
