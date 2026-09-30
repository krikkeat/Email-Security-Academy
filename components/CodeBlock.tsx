"use client";
import * as React from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative my-4 overflow-hidden rounded-xl bg-slate-900 shadow-lg">
      <button
        onClick={copy}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur transition hover:bg-white/20"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "คัดลอกแล้ว" : "คัดลอก"}
      </button>
      <pre className="overflow-x-auto p-5 pr-24 text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
