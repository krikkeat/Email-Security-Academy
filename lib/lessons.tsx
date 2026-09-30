import type { QuizQuestion } from "@/components/Quiz";

export type Lesson = {
  id: string;
  icon: string;
  label: string;
  title: string;
  eyebrow: string;
  lead: string;
};

export const lessons: Lesson[] = [
  {
    id: "architecture",
    icon: "🏗️",
    label: "เลือกสถาปัตยกรรม",
    title: "เลือกสถาปัตยกรรม Email Security",
    eyebrow: "Architecture Decision",
    lead: "ก่อนตั้งค่าอะไร ต้องเลือกโมเดลการ deploy ให้ถูก — เพราะมันกำหนดทั้ง mail flow, จุด control และงานดูแลระยะยาว",
  },
  {
    id: "mailflow",
    icon: "🌐",
    label: "Mail Flow & DNS",
    title: "Mail Flow & DNS Topology",
    eyebrow: "Foundation",
    lead: "เข้าใจว่าอีเมลเดินทางผ่านจุดไหนบ้าง และ DNS record ใดควบคุมเส้นทาง",
  },
  {
    id: "spf",
    icon: "📍",
    label: "ตั้งค่า SPF",
    title: "ตั้งค่า SPF (Sender Policy Framework)",
    eyebrow: "DNS Authentication · 1/3",
    lead: "SPF บอกว่า IP/เซิร์ฟเวอร์ใดได้รับอนุญาตให้ส่งอีเมลแทนโดเมน — TXT record เดียวต่อโดเมน",
  },
  {
    id: "dkim",
    icon: "✍️",
    label: "ตั้งค่า DKIM",
    title: "ตั้งค่า DKIM (DomainKeys Identified Mail)",
    eyebrow: "DNS Authentication · 2/3",
    lead: "DKIM ลงลายเซ็นดิจิทัลบนอีเมล ผู้รับตรวจด้วย public key ใน DNS เพื่อยืนยันว่าไม่ถูกแก้ไข",
  },
  {
    id: "dmarc",
    icon: "⚖️",
    label: "Rollout DMARC",
    title: "Rollout DMARC ทีละขั้น",
    eyebrow: "DNS Authentication · 3/3",
    lead: "DMARC มัดรวม SPF+DKIM เข้ากับโดเมน From ที่ผู้ใช้เห็น และกำหนดว่าจะทำอย่างไรเมื่อ fail",
  },
  {
    id: "gateway",
    icon: "🛡️",
    label: "Config Gateway",
    title: "Config Gateway / Filtering",
    eyebrow: "Threat Protection",
    lead: "ตั้งค่าเลเยอร์กรองภัย — anti-spam, sandbox, URL protection และปรับ policy",
  },
  {
    id: "encryption",
    icon: "🔐",
    label: "Encryption & DLP",
    title: "Encryption & DLP",
    eyebrow: "Data Protection",
    lead: "ป้องกันข้อมูลระหว่างทางและขาออก — บังคับ TLS, การเข้ารหัสระดับข้อความ และ DLP policy",
  },
  {
    id: "operate",
    icon: "✅",
    label: "Test & Operate",
    title: "Test, Monitor & Operate",
    eyebrow: "Validation & Day-2 Ops",
    lead: "เทสต์ให้ครบ, monitor รายงาน, มี runbook รับมือเหตุ และ decommission ระบบเก่าอย่างปลอดภัย",
  },
];

export const finalQuiz: QuizQuestion[] = [
  {
    q: "สถาปัตยกรรมใดไม่ต้องแก้ MX record ในการ deploy?",
    options: ["SEG (Inline)", "API-based (ICES)", "ทั้งสองแบบต้องแก้", "ไม่มีข้อถูก"],
    answer: 1,
    explain: "API-based (ICES) ต่อผ่าน API เข้า mailbox โดยตรง จึงไม่ต้องแก้ MX record ต่างจาก SEG ที่ต้องชี้ MX มาที่ gateway",
  },
  {
    q: "SPF อนุญาตให้ทำ DNS lookup ได้สูงสุดกี่ครั้ง?",
    options: ["5", "10", "15", "ไม่จำกัด"],
    answer: 1,
    explain: "SPF จำกัดที่ 10 DNS lookups เมื่อ unroll ทุก include — เกินแล้วจะเกิด permerror และ SPF ล้มเหลวทั้งหมด",
  },
  {
    q: "ควรเริ่ม rollout DMARC ด้วยนโยบายใด?",
    options: ["p=reject ทันที", "p=quarantine", "p=none", "ไม่ต้องตั้ง policy"],
    answer: 2,
    explain: "เริ่มด้วย p=none เพื่อเก็บ aggregate report และ inventory ผู้ส่งให้ครบก่อน แล้วค่อยไล่เป็น quarantine → reject",
  },
  {
    q: "DKIM key ควรใช้ขนาดเท่าใดตามมาตรฐานปัจจุบัน?",
    options: ["512-bit", "1024-bit", "2048-bit", "256-bit"],
    answer: 2,
    explain: "ใช้ 2048-bit เพราะ 1024-bit อ่อนเกินไปสำหรับมาตรฐานปี 2026 และควรตั้ง selector แยกเพื่อ rotate key ได้",
  },
  {
    q: "TLS ในการเข้ารหัสอีเมลป้องกันข้อมูลในช่วงใด?",
    options: [
      "ตอนเก็บใน mailbox (at rest)",
      "ระหว่างเซิร์ฟเวอร์ (in transit)",
      "end-to-end ตลอดเส้นทาง",
      "ทุกช่วง",
    ],
    answer: 1,
    explain: "TLS เข้ารหัสเฉพาะระหว่างเซิร์ฟเวอร์ (in transit) — เมื่อถึงที่เก็บจะเป็น plaintext ถ้าไม่มี S/MIME หรือ PGP",
  },
];
