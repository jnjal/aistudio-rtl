# Google AI Studio RTL Fixer

یک افزونه/اسکریپت ساده و کاربردی برای اصلاح چیدمان راست‌چین (RTL) و بهبود نمایش متن‌های فارسی و عربی در محیط **Google AI Studio**.

<div dir="rtl">

## ویژگی‌ها
- **راست‌چین‌سازی خودکار:** تشخیص و اعمال استایل RTL روی باکس‌های متنی چت و ورودی‌ها.
- **اصلاح فونت:** استفاده از فونت‌های استاندارد و خوانا برای زبان فارسی (مثل Vazirmatn یا فونت‌های سیستم).
- **عدم تداخل:** اعمال تغییرات منحصراً روی بخش چت و پیام‌ها بدون بهم ریختن بقیه بخش‌های رابط کاربری AI Studio.

## نحوه استفاده / نصب

### روش اول: استفاده به عنوان اکستنشن مرورگر (Developer Mode)
1. این مخزن را دانلود یا `clone` کنید.
2. مرورگر خود (Chrome/Edge/Brave) را باز کرده و به آدرس `chrome://extensions` بروید.
3. گزینه **Developer mode** را در بالا سمت راست فعال کنید.
4. روی دکمه **Load unpacked** کلیک کرده و پوشه پروژه را انتخاب کنید.

### روش دوم: استفاده از طریق اسکریپت (Tampermonkey / Violentmonkey)
*(اگر پروژه را به صورت یوزراسکریپت توسعه داده‌اید)*
1. افزونه Tampermonkey را روی مرورگر خود نصب کنید.
2. روی اسکریپت `main.user.js` در این رپو کلیک کرده و گزینه **Raw** را بزنید تا پنجره نصب باز شود.
3. روی **Install** کلیک کنید.

</div>

---

## Features
- **Automatic RTL Alignment:** Properly aligns Persian, Arabic, and other right-to-left text in chat bubbles and input areas.
- **Improved Typography:** Fixes the default font scaling and rendering for better readability.
- **Isolated Styling:** Only touches the chat messages and prompts, leaving the rest of the AI Studio UI intact.

## Installation

### Method 1: Load as Unpacked Extension
1. Clone or download this repository.
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the project folder.

### Method 2: Tampermonkey Userscript
*(If applicable to your repository setup)*
1. Install the Tampermonkey extension.
2. Open the `main.user.js` file in this repo and click **Raw**.
3. Click **Install** in the Tampermonkey dashboard.

## License
This project is licensed under the MIT License.
