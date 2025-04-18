﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add('paste', function (c) {
  function h(a) {
    var b = new CKEDITOR.dom.document(a.document),
      f = b.getBody(),
      d = b.getById('cke_actscrpt');
    d && d.remove();
    f.setAttribute('contenteditable', !0);
    if (CKEDITOR.env.ie && 8 > CKEDITOR.env.version)
      b.getWindow().on('blur', function () {
        b.$.selection.empty();
      });
    b.on(
      'keydown',
      function (a) {
        var a = a.data,
          b;
        switch (a.getKeystroke()) {
          case 27:
            this.hide();
            b = 1;
            break;
          case 9:
          case CKEDITOR.SHIFT + 9:
            this.changeFocus(1), (b = 1);
        }
        b && a.preventDefault();
      },
      this
    );
    c.fire('ariaWidget', new CKEDITOR.dom.element(a.frameElement));
    b.getWindow().getFrame().removeCustomData('pendingFocus') && f.focus();
  }
  var e = c.lang.clipboard;
  c.on(
    'pasteDialogCommit',
    function (a) {
      a.data && c.fire('paste', { type: 'auto', dataValue: a.data });
    },
    null,
    null,
    1e3
  );
  return {
    title: e.title,
    minWidth: CKEDITOR.env.ie && CKEDITOR.env.quirks ? 370 : 350,
    minHeight: CKEDITOR.env.quirks ? 250 : 245,
    onShow: function () {
      this.parts.dialog.$.offsetHeight;
      this.setupContent();
      this.parts.title.setHtml(this.customTitle || e.title);
      this.customTitle = null;
    },
    onLoad: function () {
      (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) &&
        'rtl' == c.lang.dir &&
        this.parts.contents.setStyle('overflow', 'hidden');
    },
    onOk: function () {
      this.commitContent();
    },
    contents: [
      {
        id: 'general',
        label: c.lang.common.generalTab,
        elements: [
          {
            type: 'html',
            id: 'securityMsg',
            html: '<div style="white-space:normal;width:340px">' + e.securityMsg + '</div>'
          },
          {
            type: 'html',
            id: 'pasteMsg',
            html: '<div style="white-space:normal;width:340px">' + e.pasteMsg + '</div>'
          },
          {
            type: 'html',
            id: 'editing_area',
            style: 'width:100%;height:100%',
            html: '',
            focus: function () {
              var a = this.getInputElement(),
                b = a.getFrameDocument().getBody();
              !b || b.isReadOnly() ? a.setCustomData('pendingFocus', 1) : b.focus();
            },
            setup: function () {
              var a = this.getDialog(),
                b =
                  '<html dir="' +
                  c.config.contentsLangDirection +
                  '" lang="' +
                  (c.config.contentsLanguage || c.langCode) +
                  '"><head><style>body{margin:3px;height:95%}</style></head><body><script id="cke_actscrpt" type="text/javascript">window.parent.CKEDITOR.tools.callFunction(' +
                  CKEDITOR.tools.addFunction(h, a) +
                  ',this);<\/script></body></html>',
                f = CKEDITOR.env.air
                  ? 'javascript:void(0)'
                  : CKEDITOR.env.ie
                    ? 'javascript:void((function(){' +
                      encodeURIComponent(
                        'document.open();(' + CKEDITOR.tools.fixDomain + ')();document.close();'
                      ) +
                      '})())"'
                    : '',
                d = CKEDITOR.dom.element.createFromHtml(
                  '<iframe class="cke_pasteframe" frameborder="0"  allowTransparency="true" src="' +
                    f +
                    '" role="region" aria-label="' +
                    e.pasteArea +
                    '" aria-describedby="' +
                    a.getContentElement('general', 'pasteMsg').domId +
                    '" aria-multiple="true"></iframe>'
                );
              d.on(
                'load',
                function (a) {
                  a.removeListener();
                  a = d.getFrameDocument();
                  a.write(b);
                  c.focusManager.add(a.getBody());
                  CKEDITOR.env.air && h.call(this, a.getWindow().$);
                },
                a
              );
              d.setCustomData('dialog', a);
              a = this.getElement();
              a.setHtml('');
              a.append(d);
              if (CKEDITOR.env.ie) {
                var g = CKEDITOR.dom.element.createFromHtml(
                  '<span tabindex="-1" style="position:absolute" role="presentation"></span>'
                );
                g.on('focus', function () {
                  setTimeout(function () {
                    d.$.contentWindow.focus();
                  });
                });
                a.append(g);
                this.focus = function () {
                  g.focus();
                  this.fire('focus');
                };
              }
              this.getInputElement = function () {
                return d;
              };
              CKEDITOR.env.ie &&
                (a.setStyle('display', 'block'), a.setStyle('height', d.$.offsetHeight + 2 + 'px'));
            },
            commit: function () {
              var a = this.getDialog().getParentEditor(),
                b = this.getInputElement().getFrameDocument().getBody(),
                c = b.getBogus(),
                d;
              c && c.remove();
              d = b.getHtml();
              setTimeout(function () {
                a.fire('pasteDialogCommit', d);
              }, 0);
            }
          }
        ]
      }
    ]
  };
});
