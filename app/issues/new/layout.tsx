// app/issues/new/layout.tsx (server component by default)

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TraceHub - New Issue",
  description: "Create a new issue in TraceHub.",
};

export default function NewIssueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
