"use client";

import { useState } from "react";

/**
 * Native HTML5 drag-and-drop reordering for an in-memory array of drafts
 * (case-study sections, article blocks, course rows) edited entirely
 * client-side before a single form submit. Shared so each editor doesn't
 * reimplement the same drag bookkeeping.
 *
 * Deliberately additive, not a replacement for up/down buttons — dragging
 * has no keyboard equivalent, so the buttons stay as the accessible path.
 */
export function useDragReorder<T>(setItems: (updater: (prev: T[]) => T[]) => void) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  /** Spread onto the small drag-handle element within a row. */
  function dragHandleProps(index: number) {
    return {
      draggable: true,
      onDragStart: () => setDraggedIndex(index),
      onDragEnd: () => setDraggedIndex(null),
    };
  }

  /** Spread onto the row container — the actual drop target. */
  function dropTargetProps(index: number) {
    return {
      onDragOver: (e: React.DragEvent) => e.preventDefault(),
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        setItems((prev) => {
          if (draggedIndex === null || draggedIndex === index) return prev;
          const next = [...prev];
          const [moved] = next.splice(draggedIndex, 1);
          next.splice(index, 0, moved);
          return next;
        });
        setDraggedIndex(null);
      },
    };
  }

  return { draggedIndex, dragHandleProps, dropTargetProps };
}
