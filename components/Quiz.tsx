"use client";
import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [picked, setPicked] = React.useState<(number | null)[]>(() =>
    questions.map(() => null)
  );

  const choose = (qi: number, oi: number) =>
    setPicked((p) => p.map((v, i) => (i === qi ? oi : v)));

  return (
    <div className="space-y-5">
      {questions.map((question, qi) => (
        <div key={qi} className="rounded-2xl border bg-card p-5">
          <p className="mb-3 font-semibold">
            <span className="mr-2 text-violet-500">Q{qi + 1}.</span>
            {question.q}
          </p>
          <div className="grid gap-2">
            {question.options.map((opt, oi) => {
              const isPicked = picked[qi] === oi;
              const isCorrect = oi === question.answer;
              const answered = picked[qi] !== null;
              return (
                <button
                  key={oi}
                  disabled={answered}
                  onClick={() => choose(qi, oi)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition",
                    !answered && "border-border hover:border-violet-400 hover:bg-violet-50",
                    answered && isCorrect && "border-emerald-400 bg-emerald-50",
                    answered && isPicked && !isCorrect && "border-rose-400 bg-rose-50",
                    answered && !isCorrect && !isPicked && "opacity-50"
                  )}
                >
                  <span>{opt}</span>
                  {answered && isCorrect && <Check className="h-5 w-5 text-emerald-500" />}
                  {answered && isPicked && !isCorrect && <X className="h-5 w-5 text-rose-500" />}
                </button>
              );
            })}
          </div>
          {picked[qi] !== null && (
            <div
              className={cn(
                "mt-3 rounded-xl p-3 text-sm animate-fade-in",
                picked[qi] === question.answer
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-amber-50 text-amber-800"
              )}
            >
              <strong>{picked[qi] === question.answer ? "ถูกต้อง! " : "เฉลย: "}</strong>
              {question.explain}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
