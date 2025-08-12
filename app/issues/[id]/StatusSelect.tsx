"use client";
import { IssueStatusBadge } from "@/app/components";
import { Issue, IssueStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import "./StatusSelect.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statusMap: Record<IssueStatus, string> = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    CLOSED: "Closed",
  };

  const handleStatusChange = async (status: string) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        status,
      })
      .catch(() => {
        toast.error("Changes could not be saved!");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={handleStatusChange}
      >
        <Select.Trigger placeholder="Unassigned" />
        <Select.Content>
          <Select.Group>
            {Object.entries(statusMap).map(([status, label]) => (
              <Select.Item
                className="custom-select-item"
                key={status}
                value={status}
              >
                <IssueStatusBadge status={status as IssueStatus} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>{" "}
      <Toaster />
    </>
  );
};

export default StatusSelect;
