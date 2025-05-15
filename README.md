# MCMA Kitchen Volunteer App – Version 1.0

A polished, mobile-friendly volunteer scheduling and attendance app built using **Next.js**, **Tailwind CSS**, and Google Sheets as the backend.

---

## ✅ Version 1.0 – Feature Summary

### 🛠️ Initial Setup
- Built using **Next.js 15.3.2**
- Styled with **Tailwind CSS**
- Hosted on **Vercel**
- Backend data powered by **Google Sheets API** via service account
- Event data pulled and displayed dynamically
- Volunteers tracked per event
- Events sorted into **Upcoming** and **Past** using date parsing

---

### 🧑‍🍳 Signup & Email Confirmation (5/12/2025)
- Volunteers can sign up for any event by selecting:
  - Event
  - Name, phone, and email
- Post-submission:
  - Confirmation message appears inline
  - Info cleared and displayed to user
  - Confirmation emails sent via **Resend API**
    - Volunteer receives event details + calendar invite link
    - Admin (Peter) receives a copy
  - Emails include:
    - MCMA logo
    - Reply-to header
    - Clean design

---

### 🔐 Security & Trust
- **hCaptcha** integration protects form from spam
- **Privacy and Terms disclaimer** added
- Basic **error logging** built in for form and API

---

### 🎨 UI / UX Upgrades (5/13/2025)
- Lead name + SMS link added to each event card
- Vertical spacing refined for:
  - Lead info and volunteer list
  - Event headers and content
- Font and spacing adjusted for clean, Apple-style readability

---

### 🌙 Dark Mode Support
- Header sections (`Upcoming Events`, `Past Events`) now visible in dark mode
- Theming respects `prefers-color-scheme`
- Past events no longer disappear in dark mode

---

### 🧩 Inline Feedback
- `alert()` replaced with toast-style inline confirmations
  - Example: `Attendance saved ✔`
  - Auto-dismisses after 2 seconds

---

### ⏳ Elegant Apple-style Loader
- Spinner shows while fetching event data
- Smooth, minimal (CSS only)
- Auto-hides after data loads

---

## 🔁 Deployment
- All changes committed and pushed
- Ready for deployment via **Git + Vercel**

---

## 🚀 Stack
- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Google Sheets API (via service account)
- **Email:** Resend API
- **Security:** hCaptcha
- **Hosting:** Vercel

---

## 📌 Roadmap Ideas
- [ ] Admin filters for event management
- [ ] Export volunteer data to CSV
- [ ] Edit/cancel functionality for volunteers
- [ ] Admin dashboard view
- [ ] Multi-language support

---

## 👏 Built with care by Peter Bassett
