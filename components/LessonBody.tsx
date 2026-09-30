"use client";
import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { Checklist } from "@/components/Checklist";
import { Callout } from "@/components/Callout";

function FlowStep({ n, color, children }: { n: string | number; color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}>{n}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
function Arrow() {
  return <div className="ml-4 py-1 text-xl text-violet-300">↓</div>;
}

export function LessonBody({ id }: { id: string }) {
  switch (id) {
    case "architecture":
      return (
        <div>
          <p className="mb-4">มี 3 สถาปัตยกรรมหลักที่ผู้ implement ต้องเลือก แต่ละแบบมี &quot;จุดตรวจ&quot; (control point) ต่างกัน:</p>
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <Card className="border-t-4 border-t-sky-400"><CardContent className="pt-6 text-center"><div className="text-2xl font-black text-sky-500">SEG</div><p className="mt-2 text-sm text-muted-foreground">Secure Email Gateway — กรองที่ transport layer <b>ก่อน</b>ถึง mailbox</p></CardContent></Card>
            <Card className="border-t-4 border-t-emerald-400"><CardContent className="pt-6 text-center"><div className="text-2xl font-black text-emerald-500">API</div><p className="mt-2 text-sm text-muted-foreground">API-based (ICES) — ต่อผ่าน API เข้า mailbox <b>หลัง</b>ส่ง</p></CardContent></Card>
            <Card className="border-t-4 border-t-fuchsia-400"><CardContent className="pt-6 text-center"><div className="text-2xl font-black text-fuchsia-500">Hybrid</div><p className="mt-2 text-sm text-muted-foreground">ผสมทั้งสอง — SEG + API ทำงานร่วมกัน</p></CardContent></Card>
          </div>

          <h3 className="mb-3 mt-8 text-xl font-bold">🔍 เปรียบเทียบเชิง implement</h3>
          <Tabs defaultValue="seg">
            <TabsList>
              <TabsTrigger value="seg">SEG (Inline)</TabsTrigger>
              <TabsTrigger value="api">API-based (ICES)</TabsTrigger>
            </TabsList>
            <TabsContent value="seg">
              <Card><CardContent className="space-y-2 pt-6 text-sm">
                <p>🔀 <b>ต้องแก้ MX record</b> ให้ชี้มาที่ gateway <Badge variant="red">ต้องแก้</Badge></p>
                <p>🛑 จุดตรวจ: <b>ก่อนส่ง</b> (pre-delivery) — บล็อกก่อนถึง inbox ได้ <Badge variant="green">ได้</Badge></p>
                <p>👁️ เห็น internal/ATO email: <Badge variant="red">ไม่เห็น</Badge></p>
                <p>⏱️ เวลา deploy: ชั่วโมง–วัน (ต้องวาง mail flow)</p>
                <p>⚠️ อยู่ในเส้น mail flow → เป็น chokepoint (ต้องทำ HA)</p>
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="api">
              <Card><CardContent className="space-y-2 pt-6 text-sm">
                <p>🔀 <b>ไม่ต้องแก้ MX</b> — ต่อผ่าน OAuth/Graph API <Badge variant="green">ไม่ต้อง</Badge></p>
                <p>🛑 จุดตรวจ: <b>หลังส่ง</b> (post-delivery) — claw-back จาก mailbox</p>
                <p>👁️ เห็น internal/ATO email: <Badge variant="green">เห็น</Badge></p>
                <p>⏱️ เวลา deploy: นาที (แค่ grant สิทธิ์)</p>
                <p>✅ ทำงาน out-of-band ไม่เป็น SPOF</p>
              </CardContent></Card>
            </TabsContent>
          </Tabs>

          <Callout kind="info" title="💡 หลักการเลือก">
            เลือกตาม &quot;เส้นทาง bypass ที่อันตรายที่สุด&quot; ขององค์กร — ห่วงภัยภายนอกก่อนถึง inbox เน้น SEG; ห่วง BEC/ATO/internal phishing เน้น API; องค์กรใหญ่มักใช้ Hybrid
          </Callout>
          <Callout kind="warn" title="⚠️ ข้อควรระวัง">
            SEG เป็น chokepoint — ถ้าล่ม อีเมลทั้งองค์กรค้าง ต้องออกแบบ HA/failover และ MX สำรองเสมอ
          </Callout>
        </div>
      );

    case "mailflow":
      return (
        <div>
          <h3 className="mb-3 text-xl font-bold">📨 เส้นทางอีเมลขาเข้า (Inbound)</h3>
          <div className="space-y-0">
            <FlowStep n={1} color="bg-sky-500"><b>ผู้ส่งภายนอก</b> — query MX record ของโดเมนเราผ่าน DNS</FlowStep>
            <Arrow />
            <FlowStep n={2} color="bg-emerald-500"><b>SEG / Gateway</b> — MX ชี้มาที่นี่ (กรณี SEG) กรอง spam/malware/URL</FlowStep>
            <Arrow />
            <FlowStep n={3} color="bg-fuchsia-500"><b>Mail platform</b> (M365/Google) — ตรวจ SPF/DKIM/DMARC + API scan (ICES)</FlowStep>
            <Arrow />
            <FlowStep n={4} color="bg-amber-500"><b>Mailbox</b> — ผู้ใช้ปลายทาง</FlowStep>
          </div>

          <h3 className="mb-3 mt-8 text-xl font-bold">🗂️ DNS records ที่เกี่ยวข้อง</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="mx"><AccordionTrigger>MX — ชี้ว่า mail server อยู่ที่ไหน</AccordionTrigger><AccordionContent>เช่น <code className="rounded bg-muted px-1.5 py-0.5">10 mx.company.com</code> — ตัวเลขคือ priority (น้อย = ก่อน)</AccordionContent></AccordionItem>
            <AccordionItem value="ptr"><AccordionTrigger>PTR — Reverse DNS (สำคัญต่อ reputation)</AccordionTrigger><AccordionContent>IP → hostname ต้องตรงกับ A record — ผู้รับหลายรายปฏิเสธอีเมลที่ไม่มี PTR ที่ถูกต้อง</AccordionContent></AccordionItem>
            <AccordionItem value="txt"><AccordionTrigger>TXT — SPF / DKIM / DMARC</AccordionTrigger><AccordionContent>3 record นี้คือหัวใจของ authentication — เราจะเจาะแต่ละตัวในบทถัดไป</AccordionContent></AccordionItem>
          </Accordion>

          <Callout kind="warn" title="⚠️ MX cutover = ช่วงเสี่ยงที่สุด">
            เมื่อเปลี่ยน MX ให้ชี้มาที่ SEG ใหม่ ให้ลด TTL เหลือ 300 วินาทีล่วงหน้า 24-48 ชม. เพื่อให้ rollback ได้เร็ว และ monitor mail flow ทันทีหลัง cutover
          </Callout>
          <Callout kind="ok" title="✅ Best practice">
            ตั้งค่า valid forward + reverse DNS (A + PTR ตรงกัน) บนทุก sending IP — เป็นเงื่อนไขพื้นฐานที่ผู้รับใช้ตัดสิน reputation
          </Callout>
        </div>
      );

    case "spf":
      return (
        <div>
          <h3 className="mb-2 text-xl font-bold">📝 โครงสร้าง SPF record</h3>
          <CodeBlock code={`; TXT record ที่ root domain (company.com)
v=spf1 ip4:203.0.113.10 ip4:203.0.113.11 include:spf.protection.outlook.com include:_spf.google.com -all`} />

          <h3 className="mb-3 mt-6 text-xl font-bold">🧩 ความหมายแต่ละส่วน</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="v"><AccordionTrigger><code>v=spf1</code></AccordionTrigger><AccordionContent>เวอร์ชัน SPF — ต้องขึ้นต้นด้วยค่านี้เสมอ</AccordionContent></AccordionItem>
            <AccordionItem value="ip"><AccordionTrigger><code>ip4:203.0.113.10</code></AccordionTrigger><AccordionContent>อนุญาต IPv4 นี้ให้ส่งอีเมลแทนโดเมนได้</AccordionContent></AccordionItem>
            <AccordionItem value="inc"><AccordionTrigger><code>include:...</code></AccordionTrigger><AccordionContent>รวม SPF ของผู้ให้บริการที่ส่งแทนเรา (M365, Google ฯลฯ) — แต่ละ include นับเป็น DNS lookup</AccordionContent></AccordionItem>
            <AccordionItem value="all"><AccordionTrigger><code>-all</code> vs <code>~all</code></AccordionTrigger><AccordionContent><b>-all</b> = hard fail (ปฏิเสธทุก IP นอกลิสต์), <b>~all</b> = soft fail (mark ว่าน่าสงสัยแต่ไม่ปฏิเสธ) — เริ่มด้วย ~all ตอนทดสอบ</AccordionContent></AccordionItem>
          </Accordion>

          <h3 className="mb-2 mt-6 text-xl font-bold">⚠️ กฎเหล็ก: 10 DNS Lookups</h3>
          <p className="mb-2 text-sm">SPF ทำ DNS lookup ได้ <b>ไม่เกิน 10 ครั้ง</b> เมื่อ unroll ทุก include/a/mx/redirect — เกินแล้วเกิด <code className="rounded bg-muted px-1.5 py-0.5">permerror</code> และ SPF <b>ล้มเหลวทั้งหมด</b></p>
          <Callout kind="danger" title="❌ ตัวอย่างที่พัง">
            ทุกเครื่องมือที่เพิ่ม (CRM, billing, sequencer) เพิ่ม include → lookup ที่ 11 ทำให้ record ทั้งอันเป็นโมฆะเงียบๆ โดยไม่มี error แจ้ง
          </Callout>
          <Callout kind="ok" title="✅ วิธีแก้">
            ใช้ SPF flattening แปลง include เป็น IP ตรง • มี SPF record เดียวต่อโดเมน (ห้ามมี 2 TXT SPF) • เริ่ม ~all ตอนทดสอบแล้วค่อยเข้ม -all
          </Callout>

          <h3 className="mb-2 mt-6 text-xl font-bold">🔧 ตรวจสอบด้วย dig</h3>
          <CodeBlock code={`dig TXT company.com +short
dig TXT _spf.google.com +short`} />
        </div>
      );

    case "dkim":
      return (
        <div>
          <h3 className="mb-3 text-xl font-bold">🔑 กลไก DKIM</h3>
          <div className="space-y-0">
            <FlowStep n={1} color="bg-sky-500">เซิร์ฟเวอร์ผู้ส่ง <b>เซ็น header + body</b> ด้วย <b>private key</b></FlowStep>
            <Arrow />
            <FlowStep n={2} color="bg-emerald-500">แนบลายเซ็นใน header <code>DKIM-Signature</code> (ระบุ selector + domain)</FlowStep>
            <Arrow />
            <FlowStep n={3} color="bg-fuchsia-500">ผู้รับ query <b>public key</b> ที่ <code>selector._domainkey.company.com</code></FlowStep>
            <Arrow />
            <FlowStep n={4} color="bg-amber-500">ตรวจลายเซ็น — ตรง = ไม่ถูกแก้ไข ✅</FlowStep>
          </div>

          <h3 className="mb-2 mt-8 text-xl font-bold">📝 DKIM public key record</h3>
          <CodeBlock code={`; TXT record ที่ s1._domainkey.company.com
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
vX8kQp2mN7rT4wY6zB1cD3eF5gH8jK0lM2nO4pQ6rS8tU0vW2xZ4aB6cD8eF0gH2
jK4lM6nO8pQ0rS2tU4vW6xZ8aB0cD2eF4gH6jK8lM0nO2pQ4rS6tU8vW0xZ2aB4
cD6eF8gH0jK2lM4nO6pQ8rS0tU2vW4xZ6aB8cD0eF2gH4jK6lM8nO0pQ2rS4tU6
vW8xZ0aB2cD4eF6gH8jK0lM2nO4pQwIDAQAB`} />

          <Callout kind="warn" title="⚠️ ใช้ key ขนาด 2048-bit">
            1024-bit อ่อนเกินไปสำหรับมาตรฐานปี 2026 — ใช้ 2048-bit และตั้ง selector แยกต่อโดเมน/ต่อผู้ส่ง
          </Callout>
          <Callout kind="ok" title="✅ Key Rotation">
            หมุน DKIM key ตามตาราง (เช่นทุก 6 เดือน) โดยสร้าง selector ใหม่ (s2) publish คู่ขนาน แล้วค่อยสลับ — ไม่ทำให้อีเมลที่ค้างอยู่ fail
          </Callout>
          <Callout kind="danger" title="❌ ระวัง key ถูกตัด">
            ถ้า provider ตัด public key ยาวเป็น 2 TXT string (DNS จำกัด 255 ตัวอักษร/string) ต้องต่อกันให้ถูก — ไม่งั้น DKIM verify ไม่ผ่าน
          </Callout>
        </div>
      );

    case "dmarc":
      return (
        <div>
          <h3 className="mb-2 text-xl font-bold">📝 DMARC record</h3>
          <CodeBlock code={`; TXT record ที่ _dmarc.company.com
v=DMARC1; p=reject; rua=mailto:dmarc-agg@company.com; ruf=mailto:dmarc-forensic@company.com; pct=100; adkim=s; aspf=s; fo=1`} />

          <h3 className="mb-3 mt-6 text-xl font-bold">🧩 พารามิเตอร์สำคัญ</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="p"><AccordionTrigger><code>p=</code> — นโยบาย</AccordionTrigger><AccordionContent>none / quarantine / reject — กำหนดว่าทำอย่างไรเมื่ออีเมล fail</AccordionContent></AccordionItem>
            <AccordionItem value="rua"><AccordionTrigger><code>rua=</code> / <code>ruf=</code></AccordionTrigger><AccordionContent>rua = aggregate report (สรุปรายวัน), ruf = forensic report (รายฉบับที่ fail)</AccordionContent></AccordionItem>
            <AccordionItem value="pct"><AccordionTrigger><code>pct=</code></AccordionTrigger><AccordionContent>% ของอีเมลที่บังคับใช้นโยบาย — ใช้ ramp up ค่อยๆ เช่น 25 → 50 → 100</AccordionContent></AccordionItem>
            <AccordionItem value="align"><AccordionTrigger><code>adkim=</code> / <code>aspf=</code></AccordionTrigger><AccordionContent>โหมด alignment: s = strict (ตรงเป๊ะ), r = relaxed (อนุญาต subdomain)</AccordionContent></AccordionItem>
          </Accordion>

          <h3 className="mb-3 mt-6 text-xl font-bold">🚦 แผน Rollout 4 ระยะ (สำคัญที่สุด)</h3>
          <div className="space-y-0">
            <FlowStep n={0} color="bg-slate-400"><b><code>p=none</code> (สัปดาห์ 0-2)</b> — publish + rua, inventory ทุกแหล่งส่ง, verify SPF/DKIM (ยังไม่บล็อก)</FlowStep>
            <Arrow />
            <FlowStep n={1} color="bg-amber-500"><b><code>p=quarantine; pct 25→100</code></b> — ค่อยๆ เพิ่ม % ที่ส่ง fail ไป spam, แก้ผู้ส่งจริงที่ยัง fail</FlowStep>
            <Arrow />
            <FlowStep n={2} color="bg-emerald-500"><b>ค้าง &lt;1% non-compliant 30 วัน</b> — ยืนยันว่าไม่มีผู้ส่งจริงหลุด</FlowStep>
            <Arrow />
            <FlowStep n={3} color="bg-rose-500"><b><code>p=reject</code></b> — เป้าหมายสุดท้าย ปฏิเสธ spoofing ทั้งหมด</FlowStep>
          </div>

          <Callout kind="danger" title="❌ อย่าเริ่มที่ p=reject ทันที">
            จะทำให้อีเมลที่ถูกกฎหมาย (marketing, CRM, third-party) ถูกปฏิเสธหมด — ต้องผ่าน p=none เพื่อเก็บ report ให้ครบก่อนเสมอ
          </Callout>
        </div>
      );

    case "gateway":
      return (
        <div>
          <h3 className="mb-3 text-xl font-bold">🧰 เลเยอร์การกรองที่ต้องตั้งค่า</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-l-4 border-l-rose-400"><CardContent className="pt-6"><b className="text-rose-500">🚫 Anti-spam / Anti-malware</b><p className="mt-2 text-sm text-muted-foreground">signature + reputation filtering, ตั้ง threshold ให้พอดี</p></CardContent></Card>
            <Card className="border-l-4 border-l-fuchsia-400"><CardContent className="pt-6"><b className="text-fuchsia-500">🧪 Sandbox / Detonation</b><p className="mt-2 text-sm text-muted-foreground">วิเคราะห์ไฟล์แนบ+URL ในสภาพจำลอง</p></CardContent></Card>
            <Card className="border-l-4 border-l-sky-400"><CardContent className="pt-6"><b className="text-sky-500">🔗 URL Rewriting</b><p className="mt-2 text-sm text-muted-foreground">เขียน URL ใหม่ผ่าน proxy ตรวจตอนคลิก</p></CardContent></Card>
            <Card className="border-l-4 border-l-emerald-400"><CardContent className="pt-6"><b className="text-emerald-500">✂️ CDR</b><p className="mt-2 text-sm text-muted-foreground">ถอด active content ออกแล้วสร้างไฟล์ใหม่ให้สะอาด</p></CardContent></Card>
          </div>

          <h3 className="mb-2 mt-8 text-xl font-bold">⚙️ ลำดับการตั้งค่า (Policy tuning)</h3>
          <Checklist items={[
            "เปิด anti-spam/anti-malware baseline แล้ว monitor false positive 1-2 สัปดาห์",
            "เปิด sandbox สำหรับไฟล์เสี่ยง (exe, macro Office, ISO, LNK, script)",
            "เปิด URL rewriting + time-of-click protection ทุกลิงก์",
            "ตั้ง impersonation / display-name spoofing protection (กัน BEC)",
            "ตั้ง allow/block list และ transport rules ตามองค์กร",
            "เปิด attachment/content filtering policy ตาม compliance",
          ]} />

          <Callout kind="warn" title="⚠️ Tuning เป็นงานต่อเนื่อง">
            อย่าตั้งเข้มสุดตั้งแต่วันแรก — เริ่มจาก monitor/audit mode แล้วค่อยปรับเข้มโดยดูจาก false positive rate และ report ของผู้ใช้
          </Callout>
        </div>
      );

    case "encryption":
      return (
        <div>
          <h3 className="mb-3 text-xl font-bold">🔒 การเข้ารหัส 3 ระดับ</h3>
          <Tabs defaultValue="tls">
            <TabsList>
              <TabsTrigger value="tls">TLS</TabsTrigger>
              <TabsTrigger value="smime">S/MIME</TabsTrigger>
              <TabsTrigger value="pgp">PGP</TabsTrigger>
            </TabsList>
            <TabsContent value="tls"><Card><CardContent className="pt-6 text-sm"><p><b>ขอบเขต:</b> ระหว่างเซิร์ฟเวอร์ (in transit)</p><p className="mt-1"><b>เมื่อไหร่ใช้:</b> ขั้นต่ำสุด — เปิด opportunistic + forced TLS กับคู่ค้าสำคัญ</p></CardContent></Card></TabsContent>
            <TabsContent value="smime"><Card><CardContent className="pt-6 text-sm"><p><b>ขอบเขต:</b> ต้นทางถึงปลายทาง + เซ็นดิจิทัล</p><p className="mt-1"><b>เมื่อไหร่ใช้:</b> องค์กรที่มี PKI/ใบรับรอง ต้องการ non-repudiation</p></CardContent></Card></TabsContent>
            <TabsContent value="pgp"><Card><CardContent className="pt-6 text-sm"><p><b>ขอบเขต:</b> end-to-end (web of trust)</p><p className="mt-1"><b>เมื่อไหร่ใช้:</b> กลุ่ม technical / คู่ค้าเฉพาะ</p></CardContent></Card></TabsContent>
          </Tabs>

          <h3 className="mb-2 mt-6 text-xl font-bold">🔧 บังคับ TLS (forced TLS)</h3>
          <CodeBlock code={`# Connector / transport rule แนวคิด (M365 / SEG)
# บังคับ TLS 1.2+ ขาออกไปโดเมนคู่ค้าสำคัญ
partner-domain: partner.example.com
tls-version:    TLSv1.2
require-tls:    true
on-failure:     reject-and-log`} />

          <h3 className="mb-2 mt-6 text-xl font-bold">🛡️ DLP Policy</h3>
          <Checklist items={[
            "กำหนด sensitive data types (เลขบัตรเครดิต, เลขบัตรประชาชน, ข้อมูลลูกค้า)",
            "กำหนด action: block / encrypt / notify / quarantine เมื่อตรวจพบ",
            "ตั้ง policy tips เตือนผู้ใช้ก่อนส่ง (ลด friction)",
            "เริ่มด้วย audit mode → ดู false positive → ค่อยเปิด enforce",
          ]} />

          <Callout kind="warn" title="⚠️ TLS กันแค่ระหว่างทาง">
            เมื่ออีเมลถึงที่เก็บ (at rest) จะเป็น plaintext ถ้าไม่มี S/MIME หรือ PGP — ข้อมูลลับสูงต้องใช้ end-to-end encryption
          </Callout>
        </div>
      );

    case "operate":
      return (
        <div>
          <h3 className="mb-3 text-xl font-bold">🧪 เครื่องมือเทสต์ (ก่อน go-live)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="spf"><AccordionTrigger>ตรวจ SPF (+ ไม่เกิน 10 lookup)</AccordionTrigger><AccordionContent>MXToolbox SPF Checker, Red Sift SPF Checker</AccordionContent></AccordionItem>
            <AccordionItem value="dkim"><AccordionTrigger>ตรวจ DKIM verify</AccordionTrigger><AccordionContent>ส่งเมลทดสอบไป <code>check-auth@verifier.port25.com</code> จะได้ report กลับ</AccordionContent></AccordionItem>
            <AccordionItem value="dmarc"><AccordionTrigger>ตรวจ DMARC + alignment</AccordionTrigger><AccordionContent>DMARC analyzer, dmarcian</AccordionContent></AccordionItem>
            <AccordionItem value="score"><AccordionTrigger>คะแนนรวม deliverability</AccordionTrigger><AccordionContent>mail-tester.com (ส่งเมลไปแล้วดูคะแนน /10)</AccordionContent></AccordionItem>
          </Accordion>
          <CodeBlock code={`# ตรวจ record ทั้งหมดด้วย dig
dig TXT company.com +short                # SPF
dig TXT s1._domainkey.company.com +short  # DKIM
dig TXT _dmarc.company.com +short         # DMARC
dig MX company.com +short                 # MX`} />

          <h3 className="mb-2 mt-6 text-xl font-bold">🚨 Runbook: รับมือ Phishing incident</h3>
          <div className="space-y-0">
            <FlowStep n={1} color="bg-sky-500"><b>Identify</b> — รับ report จากผู้ใช้ (ปุ่ม report) / SEG alert</FlowStep>
            <Arrow />
            <FlowStep n={2} color="bg-amber-500"><b>Contain</b> — quarantine/ลบอีเมลจากทุก mailbox, block sender/URL/hash</FlowStep>
            <Arrow />
            <FlowStep n={3} color="bg-fuchsia-500"><b>Eradicate</b> — reset credential ถ้าหลุด, isolate endpoint ถ้าติดมัลแวร์</FlowStep>
            <Arrow />
            <FlowStep n={4} color="bg-emerald-500"><b>Recover &amp; Lessons</b> — คืนค่า, อัปเดต rule, post-mortem</FlowStep>
          </div>

          <Callout kind="danger" title="❌ อย่าปิดระบบเก่าทันที (migration)">
            รันคู่ขนาน (coexistence) ระยะหนึ่ง — ยืนยันว่าระบบใหม่จับภัยได้ครบก่อน แล้วค่อยลด MX priority ของเก่า → ปิด → ลบ record
          </Callout>
          <Callout kind="ok" title="✅ จบหลักสูตร!">
            คุณครอบคลุมทุกขั้นของการ implement email security แล้ว — ลองทำ Quiz ท้ายบทเพื่อทดสอบความเข้าใจได้เลย 🎉
          </Callout>
        </div>
      );

    default:
      return null;
  }
}
