﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'uk', {
  title: 'Спеціальні Інструкції',
  contents: 'Довідка. Натисніть ESC і вона зникне.',
  legend: [
    {
      name: 'Основне',
      items: [
        {
          name: 'Панель Редактора',
          legend:
            'Натисніть ${toolbarFocus} для переходу до панелі інструментів. Для переміщення між групами панелі інструментів використовуйте TAB і SHIFT-TAB. Для переміщення між кнопками панелі іструментів використовуйте кнопки СТРІЛКА ВПРАВО або ВЛІВО. Натисніть ПРОПУСК або ENTER для запуску кнопки панелі інструментів'
        },
        {
          name: 'Діалог Редактора',
          legend:
            'У діалозі натисніть клавішу TAB для переходу до наступного поля, натисніть SHIFT + TAB, щоб перейти до попереднього поля, натисніть ENTER, щоб відправити дані, натисніть ESC, щоб скасувати. Для вікон, які мають кілька вкладок, натисніть ALT + F10 для переходу до списку вкладок. Перехід до наступної вкладки TAB АБО СТРІЛКА ВПРАВО. Перехід до попередньої вкладки за допомогою SHIFT + TAB або СТРІЛКА ВЛІВО. Натисніть ПРОПУСК або ENTER, щоб вибрати вкладку.'
        },
        {
          name: 'Контекстне Меню Редактора',
          legend:
            'Press ${contextMenu} or APPLICATION KEY to open context-menu. Потім перейдіть до наступного пункту меню за допомогою TAB або СТРІЛКИ ВНИЗ. Натисніть ПРОПУСК або ENTER для вибору параметру меню. Відкрийте підменю поточного параметру, натиснувши ПРОПУСК або ENTER або СТРІЛКУ ВПРАВО. Перейдіть до батьківського елемента меню, натиснувши ESC або СТРІЛКУ ВЛІВО. Закрийте контекстне меню, натиснувши ESC.'
        },
        {
          name: 'Скринька Списків Редактора',
          legend:
            'Всередині списку переходимо до наступного пункту списку  клавішею TAB або СТРІЛКА ВНИЗ. Перейти до попереднього елемента списку можна SHIFT + TAB або СТРІЛКА ВГОРУ. Натисніть ПРОПУСК або ENTER, щоб вибрати параметр списку. Натисніть клавішу ESC, щоб закрити список.'
        },
        {
          name: 'Шлях до елемента редактора',
          legend:
            'Натисніть ${elementsPathFocus} для навігації між елементами панелі. Перейдіть до наступного елемента кнопкою TAB або СТРІЛКА ВПРАВО. Перейдіть до попереднього елемента кнопкою SHIFT+TAB або СТРІЛКА ВЛІВО. Натисніть ПРОПУСК або ENTER для вибору елемента в редакторі.'
        }
      ]
    },
    {
      name: 'Команди',
      items: [
        { name: 'Відмінити команду', legend: 'Натисніть ${undo}' },
        { name: 'Повторити', legend: 'Натисніть ${redo}' },
        { name: 'Жирний', legend: 'Натисніть ${bold}' },
        { name: 'Курсив', legend: 'Натисніть ${italic}' },
        { name: 'Підкреслений', legend: 'Натисніть ${underline}' },
        { name: 'Посилання', legend: 'Натисніть ${link}' },
        { name: 'Згорнути панель інструментів', legend: 'Натисніть ${toolbarCollapse}' },
        {
          name: 'Доступ до попереднього місця фокусування',
          legend:
            'Натисніть ${accessNextSpace} для доступу до найближчої недосяжної області фокусування перед кареткою, наприклад: два сусідні елементи HR. Повторіть комбінацію клавіш для досягнення віддалених областей фокусування.'
        },
        {
          name: 'Доступ до наступного місця фокусування',
          legend:
            'Натисніть ${accessNextSpace} для доступу до найближчої недосяжної області фокусування після каретки, наприклад: два сусідні елементи HR. Повторіть комбінацію клавіш для досягнення віддалених областей фокусування.'
        },
        { name: 'Допомога з доступності', legend: 'Натисніть ${a11yHelp}' }
      ]
    }
  ]
});
