﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add('smiley', function (f) {
  for (
    var e = f.config,
      a = f.lang.smiley,
      h = e.smiley_images,
      g = e.smiley_columns || 8,
      i,
      k = function (j) {
        var c = j.data.getTarget(),
          b = c.getName();
        if ('a' == b) c = c.getChild(0);
        else if ('img' != b) return;
        var b = c.getAttribute('cke_src'),
          a = c.getAttribute('title'),
          c = f.document.createElement('img', {
            attributes: {
              src: b,
              'data-cke-saved-src': b,
              title: a,
              alt: a,
              width: c.$.width,
              height: c.$.height
            }
          });
        f.insertElement(c);
        i.hide();
        j.data.preventDefault();
      },
      n = CKEDITOR.tools.addFunction(function (a, c) {
        var a = new CKEDITOR.dom.event(a),
          c = new CKEDITOR.dom.element(c),
          b;
        b = a.getKeystroke();
        var d = 'rtl' == f.lang.dir;
        switch (b) {
          case 38:
            if ((b = c.getParent().getParent().getPrevious()))
              (b = b.getChild([c.getParent().getIndex(), 0])), b.focus();
            a.preventDefault();
            break;
          case 40:
            if ((b = c.getParent().getParent().getNext()))
              (b = b.getChild([c.getParent().getIndex(), 0])) && b.focus();
            a.preventDefault();
            break;
          case 32:
            k({ data: a });
            a.preventDefault();
            break;
          case d ? 37 : 39:
            if ((b = c.getParent().getNext())) (b = b.getChild(0)), b.focus(), a.preventDefault(!0);
            else if ((b = c.getParent().getParent().getNext()))
              (b = b.getChild([0, 0])) && b.focus(), a.preventDefault(!0);
            break;
          case d ? 39 : 37:
            if ((b = c.getParent().getPrevious()))
              (b = b.getChild(0)), b.focus(), a.preventDefault(!0);
            else if ((b = c.getParent().getParent().getPrevious()))
              (b = b.getLast().getChild(0)), b.focus(), a.preventDefault(!0);
        }
      }),
      d = CKEDITOR.tools.getNextId() + '_smiley_emtions_label',
      d = [
        '<div><span id="' + d + '" class="cke_voice_label">' + a.options + '</span>',
        '<table role="listbox" aria-labelledby="' +
          d +
          '" style="width:100%;height:100%;border-collapse:separate;" cellspacing="2" cellpadding="2"',
        CKEDITOR.env.ie && CKEDITOR.env.quirks ? ' style="position:absolute;"' : '',
        '><tbody>'
      ],
      l = h.length,
      a = 0;
    a < l;
    a++
  ) {
    0 === a % g && d.push('<tr role="presentation">');
    var m = 'cke_smile_label_' + a + '_' + CKEDITOR.tools.getNextNumber();
    d.push(
      '<td class="cke_dark_background cke_centered" style="vertical-align: middle;" role="presentation"><a href="javascript:void(0)" role="option"',
      ' aria-posinset="' + (a + 1) + '"',
      ' aria-setsize="' + l + '"',
      ' aria-labelledby="' + m + '"',
      ' class="cke_smile cke_hand" tabindex="-1" onkeydown="CKEDITOR.tools.callFunction( ',
      n,
      ', event, this );">',
      '<img class="cke_hand" title="',
      e.smiley_descriptions[a],
      '" cke_src="',
      CKEDITOR.tools.htmlEncode(e.smiley_path + h[a]),
      '" alt="',
      e.smiley_descriptions[a],
      '"',
      ' src="',
      CKEDITOR.tools.htmlEncode(e.smiley_path + h[a]),
      '"',
      CKEDITOR.env.ie
        ? " onload=\"this.setAttribute('width', 2); this.removeAttribute('width');\" "
        : '',
      '><span id="' + m + '" class="cke_voice_label">' + e.smiley_descriptions[a] + '</span></a>',
      '</td>'
    );
    a % g == g - 1 && d.push('</tr>');
  }
  if (a < g - 1) {
    for (; a < g - 1; a++) d.push('<td></td>');
    d.push('</tr>');
  }
  d.push('</tbody></table></div>');
  e = {
    type: 'html',
    id: 'smileySelector',
    html: d.join(''),
    onLoad: function (a) {
      i = a.sender;
    },
    focus: function () {
      var a = this;
      setTimeout(function () {
        a.getElement().getElementsByTag('a').getItem(0).focus();
      }, 0);
    },
    onClick: k,
    style: 'width: 100%; border-collapse: separate;'
  };
  return {
    title: f.lang.smiley.title,
    minWidth: 270,
    minHeight: 120,
    contents: [{ id: 'tab1', label: '', title: '', expand: !0, padding: 0, elements: [e] }],
    buttons: [CKEDITOR.dialog.cancelButton]
  };
});
