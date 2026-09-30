"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight, Menu, ShieldCheck, GraduationCap } from "lucide-react";
import { lessons, finalQuiz } from "@/lib/lessons";
import { LessonBody } from "@/components/LessonBody";
import { Quiz } from "@/components/Quiz";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOTAL = lessons.length + 1; // + quiz page

export default function Home() {
  const [step, setStep] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isQuiz = step === lessons.length;
  const progress = ((step + 1) / TOTAL) * 100;

  const go = (i: number) => {
    if (i < 0 || i >= TOTAL) return;
    setStep(i);
    setSidebarOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto border-r bg-white/80 backdrop-blur-xl transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-base font-black leading-tight gradient-text">Email Security Academy</h1>
                <p className="text-xs text-muted-foreground">สำหรับผู้ implement</p>
              </div>
            </div>
          </div>
          <nav className="p-3">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(i)}
                className={cn(
                  "mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  step === i
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold text-white shadow-md"
                    : "text-slate-600 hover:bg-violet-50"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    step === i ? "bg-white/25" : "bg-violet-100 text-violet-600"
                  )}
                >
                  {i + 1}
                </span>
                <span>{l.icon} {l.label}</span>
              </button>
            ))}
            <button
              onClick={() => go(lessons.length)}
              className={cn(
                "mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                isQuiz
                  ? "bg-gradient-to-r from-emerald-500 to-sky-500 font-semibold text-white shadow-md"
                  : "text-slate-600 hover:bg-emerald-50"
              )}
            >
              <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold", isQuiz ? "bg-white/25" : "bg-emerald-100 text-emerald-600")}>
                <GraduationCap className="h-4 w-4" />
              </span>
              <span>🎓 Quiz ท้ายบท</span>
            </button>
          </nav>
        </aside>

        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" />
        )}

        {/* Main */}
        <main className="w-full flex-1 px-5 py-10 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <div className="sticky top-0 z-20 -mx-5 mb-6 bg-transparent px-5 pb-4 pt-2 backdrop-blur-sm lg:-mx-12 lg:px-12">
              <Progress value={progress} />
              <p className="mt-2 text-xs font-medium text-muted-foreground">
                {isQuiz ? "แบบทดสอบท้ายบท" : `บทที่ ${step + 1} จาก ${lessons.length}`} · ความคืบหน้า {Math.round(progress)}%
              </p>
            </div>

            {!isQuiz ? (
              <article key={step} className="animate-fade-in">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-violet-600">
                  {lessons[step].icon} {lessons[step].eyebrow}
                </span>
                <h2 className="mb-2 text-3xl font-black text-slate-800">{lessons[step].title}</h2>
                <p className="mb-8 text-lg text-muted-foreground">{lessons[step].lead}</p>
                <LessonBody id={lessons[step].id} />
              </article>
            ) : (
              <article className="animate-fade-in">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-600">
                  🎓 Final Quiz
                </span>
                <h2 className="mb-2 text-3xl font-black text-slate-800">ทดสอบความเข้าใจ</h2>
                <p className="mb-8 text-lg text-muted-foreground">5 คำถามครอบคลุมเนื้อหาทั้งหลักสูตร — เลือกคำตอบเพื่อดูเฉลยทันที</p>
                <Quiz questions={finalQuiz} />
              </article>
            )}

            {/* Pager */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <Button variant="outline" onClick={() => go(step - 1)} disabled={step === 0}>
                <ChevronLeft className="h-4 w-4" /> ก่อนหน้า
              </Button>
              <Button onClick={() => go(step + 1)} disabled={step === TOTAL - 1}>
                {step === lessons.length - 1 ? "ไป Quiz" : step === TOTAL - 1 ? "จบแล้ว 🎉" : "ถัดไป"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
