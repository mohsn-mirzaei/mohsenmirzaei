"use client";

import { useState } from "react";
import { TextField, TextAreaField } from "@/components/admin/ControlledFields";
import { useDragReorder } from "@/lib/admin/use-drag-reorder";

export type ArticleBlockDraft =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "ul"; items: string }
  | { type: "quote"; text: string };

const BLOCK_TYPES = ["p", "h2", "code", "ul", "quote"] as const;
type BlockType = (typeof BLOCK_TYPES)[number];

function emptyBlock(type: BlockType): ArticleBlockDraft {
  switch (type) {
    case "p":
      return { type: "p", text: "" };
    case "h2":
      return { type: "h2", text: "" };
    case "code":
      return { type: "code", lang: "", code: "" };
    case "ul":
      return { type: "ul", items: "" };
    case "quote":
      return { type: "quote", text: "" };
  }
}

export function ArticleBlocksEditor({
  name,
  initialBlocks,
}: {
  name: string;
  initialBlocks: ArticleBlockDraft[];
}) {
  const [blocks, setBlocks] = useState<ArticleBlockDraft[]>(
    initialBlocks.length > 0 ? initialBlocks : [emptyBlock("p")],
  );

  function update(index: number, block: ArticleBlockDraft) {
    setBlocks((prev) => prev.map((b, i) => (i === index ? block : b)));
  }

  function changeType(index: number, type: BlockType) {
    update(index, emptyBlock(type));
  }

  function add() {
    setBlocks((prev) => [...prev, emptyBlock("p")]);
  }

  function remove(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: "up" | "down") {
    setBlocks((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const { draggedIndex, dragHandleProps, dropTargetProps } = useDragReorder(setBlocks);

  return (
    <div className="flex flex-col gap-8">
      <input type="hidden" name={name} value={JSON.stringify(blocks)} readOnly />

      {blocks.map((block, index) => (
        <div
          key={index}
          {...dropTargetProps(index)}
          className={`flex flex-col gap-4 rounded-2xl border border-line p-6 ${draggedIndex === index ? "opacity-40" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                {...dragHandleProps(index)}
                title="Drag to reorder"
                className="cursor-grab select-none text-fg-dim hover:text-fg active:cursor-grabbing"
              >
                ⠿
              </span>
              <select
                value={block.type}
                onChange={(e) => changeType(index, e.target.value as BlockType)}
                className="border-b border-line bg-transparent py-1 text-sm text-fg outline-none focus:border-accent"
              >
                {BLOCK_TYPES.map((t) => (
                  <option key={t} value={t} className="bg-ink-soft">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(index, "up")}
                disabled={index === 0}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, "down")}
                disabled={index === blocks.length - 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={blocks.length === 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent disabled:opacity-30"
              >
                Remove
              </button>
            </div>
          </div>

          <BlockFields block={block} onChange={(b) => update(index, b)} />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-fit rounded-full border border-line px-5 py-2.5 text-sm text-fg-dim transition-colors hover:border-accent hover:text-accent"
      >
        Add block
      </button>
    </div>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: ArticleBlockDraft;
  onChange: (block: ArticleBlockDraft) => void;
}) {
  switch (block.type) {
    case "p":
      return (
        <TextAreaField
          label="Text"
          value={block.text}
          onChange={(v) => onChange({ ...block, text: v })}
        />
      );
    case "quote":
      return (
        <TextAreaField
          label="Quote text"
          value={block.text}
          onChange={(v) => onChange({ ...block, text: v })}
        />
      );
    case "h2":
      return (
        <TextField
          label="Heading text"
          value={block.text}
          onChange={(v) => onChange({ ...block, text: v })}
        />
      );
    case "code":
      return (
        <>
          <TextField
            label="Language"
            value={block.lang}
            onChange={(v) => onChange({ ...block, lang: v })}
          />
          <TextAreaField
            label="Code"
            rows={6}
            value={block.code}
            onChange={(v) => onChange({ ...block, code: v })}
          />
        </>
      );
    case "ul":
      return (
        <TextAreaField
          label="Items"
          helpText="One per line."
          value={block.items}
          onChange={(v) => onChange({ ...block, items: v })}
        />
      );
  }
}
