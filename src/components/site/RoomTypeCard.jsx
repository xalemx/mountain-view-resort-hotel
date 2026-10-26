import React from "react";

// One accommodation type: its name, the beds it holds and its approximate size.
export default function RoomTypeCard({ room }) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-border/70 bg-card p-6">
      <h3 className="font-heading text-lg text-foreground">{room.name}</h3>
      <p className="mt-3 text-sm text-foreground">{room.beds}</p>
      <p className="mt-1 text-xs text-muted-foreground">{room.size}</p>
    </article>
  );
}