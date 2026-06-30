<div dir="rtl">

# aistudio RTL & Font Fixer

افزونه کروم برای راست‌چین کردن متن‌های فارسی و تغییر فونت سایت [aistudio.google.com](https://aistudio.google.com) به **وزیرمتن** (نسخه محلی، بدون نیاز به اینترنت)

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)](#)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)](#)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/jnjal/aistudio-rtl/blob/main/LICENSE)
[![Downloads](https://img.shields.io/badge/downloads-releases-blue?logo=github)](https://github.com/jnjal/aistudio-rtl/releases)
---

## ✨ ویژگی‌ها

- 🔤 **فونت وزیرمتن** — تمام وزن‌ها (Thin تا Black) به‌صورت محلی بارگذاری می‌شن، بدون وابستگی به CDN
- ↩️ **راست‌چین هوشمند** — فقط محتوای چت راست‌چین می‌شه، UI اصلی aistudio دست نمی‌خوره
- 💻 **کدها همیشه LTR** — بلوک‌های کد و `inline code` با فونت monospace و چیدمان چپ‌چین حفظ می‌شن
- ⚡ **SPA-aware** — با `MutationObserver` بعد از navigate بین مکالمات هم کار می‌کنه
- 🔘 **دکمه روشن/خاموش** — از popup افزونه می‌تونی سریع غیرفعالش کنی

---

## 📦 نصب (Developer Mode)

> افزونه هنوز در Chrome Web Store منتشر نشده — باید دستی نصب بشه

**۱. دانلود**

```
Code → Download ZIP
```
یا از releases

```
releases → latest.zip
```

یا با git:

```bash
git clone https://github.com/jnjal/aistudio-rtl.git
```

**۲. فعال‌سازی Developer Mode در Chrome**

آدرس زیر رو باز کن:

```
chrome://extensions
```

گزینه **Developer mode** رو (گوشه بالا راست) روشن کن.

**۳. بارگذاری افزونه**

روی **Load unpacked** کلیک کن و پوشه `src` داخل ریپو رو انتخاب کن.

---

## 📁 ساختار پروژه
```
aistudio-rtl/
├── src/
│   ├── fonts/
│   │   ├── Vazirmatn-Bold.woff2
│   │   ├── Vazirmatn-Medium.woff2
│   │   └── Vazirmatn-Regular.woff2
│   ├── icons/
│   │   ├── icon128.png
│   │   ├── icon16.png
│   │   └── icon48.png
│   ├── background.js      # بک‌گراند اسکریپت / سرویس ورکر افزونه
│   ├── content.css        # فونت‌ها، استایل‌های RTL و اوررایدها (به جای style.css)
│   ├── content.js         # تزریق کلاس‌ها + MutationObserver
│   ├── manifest.json      # تنظیمات افزونه (Manifest V3)
│   ├── popup.html         # رابط کاربری دکمه روشن/خاموش
│   └── popup.js           # منطق toggle و ذخیره‌سازی در Local/Sync Storage
└── README.md
```
## 🛠️ نحوه کارکرد

افزونه با اضافه کردن کلاس `aistudio-rtl` به `<body>` کار می‌کنه. تمام استایل‌ها زیر این کلاس تعریف شدن تا:

- وقتی افزونه **غیرفعاله** هیچ تغییری در صفحه ایجاد نشه
- `MutationObserver` مطمئن می‌شه بعد از هر navigation داخل SPA کلاد، کلاس حفظ بمونه
- وضعیت روشن/خاموش با `chrome.storage.local` ذخیره می‌شه

---

## 🔤 درباره فونت وزیرمتن

فونت [Vazirmatn](https://github.com/rastikerdar/vazirmatn) ساخته [رستی کردار](https://github.com/rastikerdar) است و تحت مجوز **SIL Open Font License 1.1** منتشر شده.

---

## 📄 لایسنس

MIT — برای جزئیات فایل [LICENSE](./LICENSE) رو ببین.

</div>
