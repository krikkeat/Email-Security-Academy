"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checklist({ items }: { items: string[] }) {
  const [done, setDone] = React.useState<boolean[]>(() => items.map(() => false));
  const toggle = (i: number) =>
    setDone((d) => d.map((v, idx) => (idx === i ? !v : v)));
  const completed = done.filter(Boolean).length;

  return (
    <div className="my-4 rounded-2xl border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          Checklist การตั้งค่า
        </span>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
          {completed}/{items.length} เสร็จ
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition hover:bg-muted"
          >
            <span
              className={cn(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition",
                done[i]
                  ? "border-transparent bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
                  : "border-violet-300"
              )}
            >
              {done[i] && <Check className="h-4 w-4" />}
            </span>
            <span
              className={cn(
                "text-sm",
                done[i] && "text-muted-foreground line-through"
              )}
            >
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
