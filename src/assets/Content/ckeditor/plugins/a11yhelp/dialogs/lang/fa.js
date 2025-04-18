﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'fa', {
  title: 'دستورالعمل‌های دسترسی',
  contents: 'راهنمای فهرست مطالب. برای بستن این کادر محاوره‌ای ESC را فشار دهید.',
  legend: [
    {
      name: 'عمومی',
      items: [
        {
          name: 'نوار ابزار ویرایشگر',
          legend:
            '${toolbarFocus} را برای باز کردن نوار ابزار بفشارید. با کلید Tab و Shif-Tab در مجموعه نوار ابزار بعدی و قبلی حرکت کنید. برای حرکت در کلید نوار ابزار قبلی و بعدی با کلید جهت‌نمای راست و چپ جابجا شوید. کلید Space یا Enter را برای فعال کردن کلید نوار ابزار بفشارید.'
        },
        {
          name: 'پنجره محاورهای ویرایشگر',
          legend:
            'در داخل یک پنجره محاورهای، کلید Tab را بفشارید تا به پنجرهی بعدی بروید، Shift+Tab برای حرکت به فیلد قبلی، فشردن Enter برای ثبت اطلاعات پنجره، فشردن Esc برای لغو پنجره محاورهای و برای پنجرههایی که چندین برگه دارند، فشردن Alt+F10 جهت رفتن به Tab-List. در نهایت حرکت به برگه بعدی با Tab یا کلید جهتنمای راست. حرکت به برگه قبلی با Shift+Tab یا کلید جهتنمای چپ. فشردن Space یا Enter برای انتخاب یک برگه.'
        },
        {
          name: 'منوی متنی ویرایشگر',
          legend:
            '${contextMenu} یا کلید برنامههای کاربردی را برای باز کردن منوی متن را بفشارید. سپس میتوانید برای حرکت به گزینه بعدی منو با کلید Tab و یا کلید جهتنمای پایین جابجا شوید. حرکت به گزینه قبلی با Shift+Tab یا کلید جهتنمای بالا. فشردن Space یا Enter برای انتخاب یک گزینه از منو. باز کردن زیر شاخه گزینه منو جاری با کلید Space یا Enter و یا کلید جهتنمای راست و چپ. بازگشت به منوی والد با کلید Esc یا کلید جهتنمای چپ. بستن منوی متن با Esc.'
        },
        {
          name: 'جعبه فهرست ویرایشگر',
          legend:
            'در داخل جعبه لیست، قلم دوم از اقلام لیست بعدی را با TAB و یا Arrow Down حرکت دهید. انتقال به قلم دوم از اقلام لیست قبلی را با SHIFT + TAB یا UP ARROW. کلید Space یا ENTER را برای انتخاب گزینه لیست بفشارید. کلید ESC را برای بستن جعبه لیست بفشارید.'
        },
        {
          name: 'ویرایشگر عنصر نوار راه',
          legend:
            'برای رفتن به مسیر عناصر ${elementsPathFocus} را بفشارید. حرکت به کلید عنصر بعدی با کلید Tab یا  کلید جهت‌نمای راست. برگشت به کلید قبلی با Shift+Tab یا کلید جهت‌نمای چپ. فشردن Space یا Enter برای انتخاب یک عنصر در ویرایشگر.'
        }
      ]
    },
    {
      name: 'فرمان‌ها',
      items: [
        { name: 'بازگشت به آخرین فرمان', legend: 'فشردن ${undo}' },
        { name: 'انجام مجدد فرمان', legend: 'فشردن ${redo}' },
        { name: 'فرمان درشت کردن متن', legend: 'فشردن ${bold}' },
        { name: 'فرمان کج کردن متن', legend: 'فشردن ${italic}' },
        { name: 'فرمان زیرخطدار کردن متن', legend: 'فشردن ${underline}' },
        { name: 'فرمان پیوند دادن', legend: 'فشردن ${link}' },
        { name: 'بستن نوار ابزار فرمان', legend: 'فشردن ${toolbarCollapse}' },
        {
          name: 'دسترسی به فرمان محل تمرکز قبلی',
          legend:
            'فشردن ${accessPreviousSpace} برای دسترسی به نزدیک‌ترین فضای قابل دسترسی تمرکز قبل از هشتک، برای مثال: دو عنصر مجاور HR -خط افقی-. تکرار کلید ترکیبی برای رسیدن به فضاهای تمرکز از راه دور.'
        },
        {
          name: 'دسترسی به فضای دستور بعدی',
          legend:
            'برای دسترسی به نزدیک‌ترین فضای تمرکز غیر قابل دسترس، ${accessNextSpace} را پس از علامت هشتک بفشارید، برای مثال:  دو عنصر مجاور HR -خط افقی-. کلید ترکیبی را برای رسیدن به فضای تمرکز تکرار کنید.'
        },
        { name: 'راهنمای دسترسی', legend: 'فشردن ${a11yHelp}' }
      ]
    }
  ]
});
