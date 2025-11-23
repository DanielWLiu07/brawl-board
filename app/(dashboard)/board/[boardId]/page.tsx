"use client";

import { WhiteboardCanvas } from "./_components/whiteboard-canvas";

export default function BoardPage({ params }: { params: { boardId: string } }) {
  return <WhiteboardCanvas boardId={params.boardId} />;
}
