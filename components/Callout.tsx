import * as React from "react";
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "info" | "warn" | "danger" | "ok";

const styles: Record<Kind, { wrap: string; icon: React.ReactNode; title: string }> = {
  info: {
    wrap: "border-sky-300 bg-sky-50",
    icon: <Info className="h-5 w-5 text-sky-500" />,
    title: "text-sky-700",
  },
  warn: {
    wrap: "border-amber-300 bg-amber-50",
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    title: "text-amber-700",
  },
  danger: {
    wrap: "border-rose-300 bg-rose-50",
    icon: <XCircle className="h-5 w-5 text-rose-500" />,
    title: "text-rose-700",
  },
  ok: {
    wrap: "border-emerald-300 bg-emerald-50",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    title: "text-emerald-700",
  },
};

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: Kind;
  title: string;
  children: React.ReactNode;
}) {
  const s = styles[kind];
  return (
    <div className={cn("my-4 flex gap-3 rounded-xl border-2 p-4", s.wrap)}>
      <div className="mt-0.5 shrink-0">{s.icon}</div>
      <div className="text-sm">
        <p className={cn("mb-1 font-bold", s.title)}>{title}</p>
        <div className="text-slate-700">{children}</div>
      </div>
    </div>
  );
}
