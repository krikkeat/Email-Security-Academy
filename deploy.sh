#!/usr/bin/env bash
# ────────────────────────────────────────────────────────────
# Email Security Academy — one-shot GitHub + Vercel deploy
# วิธีใช้:
#   1. แก้ตัวแปร GH_USER และ REPO ด้านล่างให้เป็นของคุณ
#   2. chmod +x deploy.sh && ./deploy.sh
# ต้องมี: git, gh (GitHub CLI), vercel (Vercel CLI) ติดตั้งแล้ว
# ────────────────────────────────────────────────────────────
set -e

GH_USER="your-username"     # 👈 แก้เป็น GitHub username ของคุณ
REPO="email-security-academy"  # 👈 ชื่อ repo ที่ต้องการ

echo "▶ 1/4  git init + commit"
git init -q
git add .
git commit -q -m "Email Security Academy — interactive teaching site" || true
git branch -M main

echo "▶ 2/4  สร้าง GitHub repo และ push (ใช้ gh CLI)"
# ถ้ายังไม่ได้ login: gh auth login
gh repo create "$REPO" --public --source=. --remote=origin --push

echo "▶ 3/4  ติดตั้ง Vercel CLI (ถ้ายังไม่มี)"
command -v vercel >/dev/null 2>&1 || npm i -g vercel

echo "▶ 4/4  deploy ขึ้น Vercel (production)"
vercel --prod --yes

echo "✅ เสร็จสิ้น! repo: https://github.com/$GH_USER/$REPO"
