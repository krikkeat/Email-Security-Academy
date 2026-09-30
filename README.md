# 🛡️ Email Security Academy

เว็บสอน **interactive** สำหรับผู้ที่ต้อง **implement / deploy email security** — static HTML ไฟล์เดียว สไตล์ glassmorphism สีสันสดใส เปิดดูได้ทันทีและ deploy ง่ายที่สุด (ไม่ต้อง build)

## ✨ Features

- **8 บทเรียน** ครบ lifecycle การ implement:1. 🏗️ เลือกสถาปัตยกรรม (SEG vs API vs Hybrid)

1. 🌐 Mail Flow & DNS Topology
2. 📍 ตั้งค่า SPF (พร้อม syntax เต็ม + กฎ 10 lookups)
3. ✍️ ตั้งค่า DKIM (selector, 2048-bit, rotation)
4. ⚖️ Rollout DMARC 4 ระยะ (none → quarantine → reject)
5. 🛡️ Config Gateway / Filtering
6. 🔐 Encryption & DLP
7. ✅ Test, Monitor & Operate + **Quiz ท้ายบท**

- Overview grid, sidebar nav, progress bar
- ปุ่มคัดลอกโค้ด, checklist ติ๊กได้, quiz เฉลยทันที
- Responsive + คีย์ลูกศร ←/→ เปลี่ยนบท

## 📁 โครงสร้าง

```
email-security-web/
├── index.html      # ทั้งเว็บอยู่ในไฟล์นี้ไฟล์เดียว
├── vercel.json     # config สำหรับ Vercel (security headers)
├── .gitignore
└── README.md

```

---

## 🚀 Push ขึ้น GitHub + Deploy ขึ้น Vercel

### ขั้นที่ 1 — Push ขึ้น GitHub

เปิด terminal ที่โฟลเดอร์นี้:

```bash
cd email-security-web

git init
git add .
git commit -m "Email Security Academy — interactive teaching site"

```

สร้าง repo เปล่าใหม่บน GitHub (ไม่ต้องติ๊ก add README) แล้ว:

```bash
# แทน <username> และ <repo> ด้วยของคุณ
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main

```

> 💡 หรือใช้ **GitHub CLI** ให้จบในคำสั่งเดียว: `gh repo create <repo> --public --source=. --push`

### ขั้นที่ 2 — Deploy ขึ้น Vercel

**วิธี A: ผ่านเว็บ (ง่ายสุด)**

1. ไปที่ [vercel.com](https://vercel.com) → **Sign up with GitHub**
2. **Add New… → Project** → เลือก repo → **Import**
3. Vercel detect เป็น static site อัตโนมัติ (ไม่ต้องตั้ง build command)
4. กด **Deploy** → รอ ~30 วินาที → ได้ URL เช่น `https://<repo>.vercel.app` 🎉

**วิธี B: ผ่าน Vercel CLI**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy

```

หลังจากนี้ทุกครั้งที่ `git push` → Vercel redeploy อัตโนมัติ

---

## ⚙️ หมายเหตุ

- เป็น **static site 100%** (ไม่มี backend/DB) — deploy ได้ทุกที่: Vercel, Netlify, Cloudflare Pages, GitHub Pages
- `vercel.json` เพิ่ม security headers ให้ (nosniff, X-Frame-Options, Referrer-Policy)
- เนื้อหา **vendor-neutral** ใช้ได้กับทุกแพลตฟอร์ม — ตัวอย่าง DNS record เป็นค่าตัวอย่าง ปรับตามโดเมนจริงก่อนใช้

