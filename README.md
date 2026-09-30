# 🛡️ Email Security Academy

เว็บสอน **interactive** สำหรับผู้ที่ต้อง **implement / deploy email security** — สร้างด้วย **Next.js 14 (App Router) + Tailwind CSS + shadcn/ui** สีสันสดใส ไม่มี backend/ฐานข้อมูล (static teaching site)

## ✨ Features

- **8 บทเรียน** ครอบคลุมทั้ง lifecycle การ implement:1. 🏗️ เลือกสถาปัตยกรรม (SEG vs API vs Hybrid) — *interactive tabs*
2. 🌐 Mail Flow & DNS Topology — *flow diagram + accordion*
3. 📍 ตั้งค่า SPF (พร้อม syntax เต็ม + กฎ 10 lookups)
4. ✍️ ตั้งค่า DKIM (selector, 2048-bit, rotation)
5. ⚖️ Rollout DMARC 4 ระยะ (none → quarantine → reject)
6. 🛡️ Config Gateway / Filtering — *checklist ติ๊กได้*
7. 🔐 Encryption & DLP — *tabs TLS/S-MIME/PGP*
8. ✅ Test, Monitor & Operate (dig commands, runbook)
- **🎓 Quiz ท้ายบท** 5 ข้อ เฉลยทันทีพร้อมคำอธิบาย
- **Copy-to-clipboard** ทุก code block (DNS records เขียนเต็มไม่ย่อ)
- **Progress bar** + sidebar navigation + keyboard-friendly
- Responsive (มือถือมี hamburger menu)

## 🚀 วิธีรัน

```bash
npm install
npm run dev

```

เปิด [http://localhost:3000](http://localhost:3000)

## 🏗️ Build สำหรับ production

```bash
npm run build
npm start

```

## 📁 โครงสร้างโปรเจกต์

```
email-security-nextjs/
├── app/
│   ├── globals.css        # theme tokens (สีสันสดใส) + tailwind
│   ├── layout.tsx
│   └── page.tsx           # หน้าหลัก: navigation + progress + quiz
├── components/
│   ├── ui/                # shadcn/ui primitives
│   │   ├── button.tsx  card.tsx  tabs.tsx
│   │   ├── accordion.tsx  progress.tsx  badge.tsx
│   ├── CodeBlock.tsx      # code + ปุ่มคัดลอก
│   ├── Checklist.tsx      # checklist ติ๊กได้
│   ├── Quiz.tsx           # quiz เฉลยทันที
│   ├── Callout.tsx        # กล่อง info/warn/danger/ok
│   └── LessonBody.tsx     # เนื้อหาทั้ง 8 บท
├── lib/
│   ├── utils.ts           # cn() helper
│   └── lessons.tsx        # metadata + quiz data
└── (config files)

```

## 🎨 ปรับแต่งสี

แก้ที่ `app/globals.css` ในบล็อก `:root` — โทนหลักคือ **ม่วง (violet) → ชมพู (fuchsia) → ฟ้า (sky)**

## 📝 หมายเหตุ

- เนื้อหาเป็น **vendor-neutral** ใช้ได้กับทุกแพลตฟอร์ม (M365, Google Workspace ฯลฯ)
- ตัวอย่าง DNS record เป็นค่าตัวอย่าง — ปรับตามโดเมนจริงก่อนใช้งาน

