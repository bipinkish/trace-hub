import { authOptions } from "@/app/auth/authOptions";
import { isValidObjectId } from "@/app/utils/utils";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { id } = await params;
  const { assignedToId, title, description } = body;
  if (assignedToId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToId } });
    if (!user) {
      return NextResponse.json({ error: "Invalid User", status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Issue" }, { status: 401 });
  }

  await prisma.issue.delete({
    where: { id },
  });
  return NextResponse.json({});
}
