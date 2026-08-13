اپلیکیشن ثبت خاطرات روزانه با تقویم شمسی، کپسول زمانی و حس‌وحال روزانه.

## ✨ امکانات

- 📝 ثبت خاطرات روزانه با متن، عکس، ویدیو و صدا
- 📅 تقویم شمسی با نمایش خاطرات هر روز
- 💌 کپسول زمانی (نامه به آینده)
- 🎨 حس‌وحال روزانه با ۴ حالت (خوب، آروم، دلتنگ، خسته)
- ⭐ علامت‌گذاری روزهای خاص
- 🔒 ورود و ثبت‌نام کاربران

## 🛠️ تکنولوژی‌ها

- **Frontend:** React, TypeScript, Tailwind CSS, React Query
- **Backend:** Node.js, Express, PostgreSQL
- **Auth:** JWT

---

## 🚀 راه‌اندازی سریع

### پیش‌نیازها

1. **Node.js 18+** رو از [nodejs.org](https://nodejs.org) نصب کن
2. **PostgreSQL** رو نصب کن:
   - مک: `brew install postgresql@15 && brew services start postgresql@15`
   - ویندوز: از [postgresql.org](https://www.postgresql.org/download/windows/)
   - لینوکس: `sudo apt install postgresql`

### همه دستورات پشت سر هم

```bash
git clone https://github.com/Fatemeh-1o1/Moment-project.git
cd Moment-project
npm install
psql -U postgres -c "CREATE ROLE moment WITH LOGIN PASSWORD 'moment';"
psql -U postgres -c "CREATE DATABASE moment OWNER moment;"
cp backend/.env.example backend/.env
npm run db:migrate -w backend
npm run dev
```
