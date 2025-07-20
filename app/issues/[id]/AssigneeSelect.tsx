"use client";
import Skeleton from "@/app/components/Skeleton";
import useUsers from "@/app/hooks/useUsers";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const handleAssignIssue = async (userId: string) => {
    await axios
      .patch("/api/issues/" + issue.id, {
        assignedToId: userId !== "Unassigned" ? userId : null,
      })
      .catch(() => {
        toast.error("Changes could not be saved!");
      });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToId || ""}
        onValueChange={handleAssignIssue}
      >
        <Select.Trigger placeholder="Unassigned" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
