import React from "react";
import ChecklistArea from "@/components/admin/ChecklistArea";
import { groupFactsByArea } from "@/lib/confirmationChecklist";

// The eight questions only the owner can settle, each with the record's items
// gathered under it and the same answers the record itself offers.
export default function ConfirmationChecklist({ facts, onDecide }) {
  const groups = groupFactsByArea(facts);

  return (
    <ol className="space-y-4">
      {groups.map((group, index) => (
        <ChecklistArea
          key={group.area.id}
          area={group.area}
          items={group.items}
          number={index + 1}
          onDecide={onDecide}
        />
      ))}
    </ol>
  );
}