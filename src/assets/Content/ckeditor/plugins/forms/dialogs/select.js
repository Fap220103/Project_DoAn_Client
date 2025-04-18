﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add('select', function (c) {
  function h(a, b, e, d, c) {
    a = f(a);
    d = d ? d.createElement('OPTION') : document.createElement('OPTION');
    if (a && d && 'option' == d.getName())
      CKEDITOR.env.ie
        ? (isNaN(parseInt(c, 10)) ? a.$.options.add(d.$) : a.$.options.add(d.$, c),
          (d.$.innerHTML = 0 < b.length ? b : ''),
          (d.$.value = e))
        : (null !== c && c < a.getChildCount()
            ? a.getChild(0 > c ? 0 : c).insertBeforeMe(d)
            : a.append(d),
          d.setText(0 < b.length ? b : ''),
          d.setValue(e));
    else return !1;
    return d;
  }
  function m(a) {
    for (var a = f(a), b = g(a), e = a.getChildren().count() - 1; 0 <= e; e--)
      a.getChild(e).$.selected && a.getChild(e).remove();
    i(a, b);
  }
  function n(a, b, e, d) {
    a = f(a);
    if (0 > b) return !1;
    a = a.getChild(b);
    a.setText(e);
    a.setValue(d);
    return a;
  }
  function k(a) {
    for (a = f(a); a.getChild(0) && a.getChild(0).remove(); );
  }
  function j(a, b, e) {
    var a = f(a),
      d = g(a);
    if (0 > d) return !1;
    b = d + b;
    b = 0 > b ? 0 : b;
    b = b >= a.getChildCount() ? a.getChildCount() - 1 : b;
    if (d == b) return !1;
    var d = a.getChild(d),
      c = d.getText(),
      o = d.getValue();
    d.remove();
    d = h(a, c, o, !e ? null : e, b);
    i(a, b);
    return d;
  }
  function g(a) {
    return (a = f(a)) ? a.$.selectedIndex : -1;
  }
  function i(a, b) {
    a = f(a);
    if (0 > b) return null;
    var e = a.getChildren().count();
    a.$.selectedIndex = b >= e ? e - 1 : b;
    return a;
  }
  function l(a) {
    return (a = f(a)) ? a.getChildren() : !1;
  }
  function f(a) {
    return a && a.domId && a.getInputElement().$ ? a.getInputElement() : a && a.$ ? a : !1;
  }
  return {
    title: c.lang.forms.select.title,
    minWidth: CKEDITOR.env.ie ? 460 : 395,
    minHeight: CKEDITOR.env.ie ? 320 : 300,
    onShow: function () {
      delete this.selectBox;
      this.setupContent('clear');
      var a = this.getParentEditor().getSelection().getSelectedElement();
      if (a && 'select' == a.getName()) {
        this.selectBox = a;
        this.setupContent(a.getName(), a);
        for (var a = l(a), b = 0; b < a.count(); b++) this.setupContent('option', a.getItem(b));
      }
    },
    onOk: function () {
      var a = this.getParentEditor(),
        b = this.selectBox,
        e = !b;
      e && (b = a.document.createElement('select'));
      this.commitContent(b);
      if (e && (a.insertElement(b), CKEDITOR.env.ie)) {
        var d = a.getSelection(),
          c = d.createBookmarks();
        setTimeout(function () {
          d.selectBookmarks(c);
        }, 0);
      }
    },
    contents: [
      {
        id: 'info',
        label: c.lang.forms.select.selectInfo,
        title: c.lang.forms.select.selectInfo,
        accessKey: '',
        elements: [
          {
            id: 'txtName',
            type: 'text',
            widths: ['25%', '75%'],
            labelLayout: 'horizontal',
            label: c.lang.common.name,
            default: '',
            accessKey: 'N',
            style: 'width:350px',
            setup: function (a, b) {
              'clear' == a
                ? this.setValue(this['default'] || '')
                : 'select' == a &&
                  this.setValue(b.data('cke-saved-name') || b.getAttribute('name') || '');
            },
            commit: function (a) {
              this.getValue()
                ? a.data('cke-saved-name', this.getValue())
                : (a.data('cke-saved-name', !1), a.removeAttribute('name'));
            }
          },
          {
            id: 'txtValue',
            type: 'text',
            widths: ['25%', '75%'],
            labelLayout: 'horizontal',
            label: c.lang.forms.select.value,
            style: 'width:350px',
            default: '',
            className: 'cke_disabled',
            onLoad: function () {
              this.getInputElement().setAttribute('readOnly', !0);
            },
            setup: function (a, b) {
              'clear' == a
                ? this.setValue('')
                : 'option' == a && b.getAttribute('selected') && this.setValue(b.$.value);
            }
          },
          {
            type: 'hbox',
            widths: ['175px', '170px'],
            children: [
              {
                id: 'txtSize',
                type: 'text',
                labelLayout: 'horizontal',
                label: c.lang.forms.select.size,
                default: '',
                accessKey: 'S',
                style: 'width:175px',
                validate: function () {
                  var a = CKEDITOR.dialog.validate.integer(c.lang.common.validateNumberFailed);
                  return '' === this.getValue() || a.apply(this);
                },
                setup: function (a, b) {
                  'select' == a && this.setValue(b.getAttribute('size') || '');
                  CKEDITOR.env.webkit && this.getInputElement().setStyle('width', '86px');
                },
                commit: function (a) {
                  this.getValue()
                    ? a.setAttribute('size', this.getValue())
                    : a.removeAttribute('size');
                }
              },
              {
                type: 'html',
                html: '<span>' + CKEDITOR.tools.htmlEncode(c.lang.forms.select.lines) + '</span>'
              }
            ]
          },
          {
            type: 'html',
            html: '<span>' + CKEDITOR.tools.htmlEncode(c.lang.forms.select.opAvail) + '</span>'
          },
          {
            type: 'hbox',
            widths: ['115px', '115px', '100px'],
            children: [
              {
                type: 'vbox',
                children: [
                  {
                    id: 'txtOptName',
                    type: 'text',
                    label: c.lang.forms.select.opText,
                    style: 'width:115px',
                    setup: function (a) {
                      'clear' == a && this.setValue('');
                    }
                  },
                  {
                    type: 'select',
                    id: 'cmbName',
                    label: '',
                    title: '',
                    size: 5,
                    style: 'width:115px;height:75px',
                    items: [],
                    onChange: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement('info', 'cmbValue'),
                        e = a.getContentElement('info', 'txtOptName'),
                        a = a.getContentElement('info', 'txtOptValue'),
                        d = g(this);
                      i(b, d);
                      e.setValue(this.getValue());
                      a.setValue(b.getValue());
                    },
                    setup: function (a, b) {
                      'clear' == a
                        ? k(this)
                        : 'option' == a &&
                          h(
                            this,
                            b.getText(),
                            b.getText(),
                            this.getDialog().getParentEditor().document
                          );
                    },
                    commit: function (a) {
                      var b = this.getDialog(),
                        e = l(this),
                        d = l(b.getContentElement('info', 'cmbValue')),
                        c = b.getContentElement('info', 'txtValue').getValue();
                      k(a);
                      for (var f = 0; f < e.count(); f++) {
                        var g = h(
                          a,
                          e.getItem(f).getValue(),
                          d.getItem(f).getValue(),
                          b.getParentEditor().document
                        );
                        d.getItem(f).getValue() == c &&
                          (g.setAttribute('selected', 'selected'), (g.selected = !0));
                      }
                    }
                  }
                ]
              },
              {
                type: 'vbox',
                children: [
                  {
                    id: 'txtOptValue',
                    type: 'text',
                    label: c.lang.forms.select.opValue,
                    style: 'width:115px',
                    setup: function (a) {
                      'clear' == a && this.setValue('');
                    }
                  },
                  {
                    type: 'select',
                    id: 'cmbValue',
                    label: '',
                    size: 5,
                    style: 'width:115px;height:75px',
                    items: [],
                    onChange: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement('info', 'cmbName'),
                        e = a.getContentElement('info', 'txtOptName'),
                        a = a.getContentElement('info', 'txtOptValue'),
                        d = g(this);
                      i(b, d);
                      e.setValue(b.getValue());
                      a.setValue(this.getValue());
                    },
                    setup: function (a, b) {
                      if ('clear' == a) k(this);
                      else if ('option' == a) {
                        var e = b.getValue();
                        h(this, e, e, this.getDialog().getParentEditor().document);
                        'selected' == b.getAttribute('selected') &&
                          this.getDialog().getContentElement('info', 'txtValue').setValue(e);
                      }
                    }
                  }
                ]
              },
              {
                type: 'vbox',
                padding: 5,
                children: [
                  {
                    type: 'button',
                    id: 'btnAdd',
                    style: '',
                    label: c.lang.forms.select.btnAdd,
                    title: c.lang.forms.select.btnAdd,
                    style: 'width:100%;',
                    onClick: function () {
                      var a = this.getDialog();
                      a.getParentEditor();
                      var b = a.getContentElement('info', 'txtOptName'),
                        e = a.getContentElement('info', 'txtOptValue'),
                        d = a.getContentElement('info', 'cmbName'),
                        c = a.getContentElement('info', 'cmbValue');
                      h(d, b.getValue(), b.getValue(), a.getParentEditor().document);
                      h(c, e.getValue(), e.getValue(), a.getParentEditor().document);
                      b.setValue('');
                      e.setValue('');
                    }
                  },
                  {
                    type: 'button',
                    id: 'btnModify',
                    label: c.lang.forms.select.btnModify,
                    title: c.lang.forms.select.btnModify,
                    style: 'width:100%;',
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement('info', 'txtOptName'),
                        e = a.getContentElement('info', 'txtOptValue'),
                        d = a.getContentElement('info', 'cmbName'),
                        a = a.getContentElement('info', 'cmbValue'),
                        c = g(d);
                      0 <= c &&
                        (n(d, c, b.getValue(), b.getValue()), n(a, c, e.getValue(), e.getValue()));
                    }
                  },
                  {
                    type: 'button',
                    id: 'btnUp',
                    style: 'width:100%;',
                    label: c.lang.forms.select.btnUp,
                    title: c.lang.forms.select.btnUp,
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement('info', 'cmbName'),
                        c = a.getContentElement('info', 'cmbValue');
                      j(b, -1, a.getParentEditor().document);
                      j(c, -1, a.getParentEditor().document);
                    }
                  },
                  {
                    type: 'button',
                    id: 'btnDown',
                    style: 'width:100%;',
                    label: c.lang.forms.select.btnDown,
                    title: c.lang.forms.select.btnDown,
                    onClick: function () {
                      var a = this.getDialog(),
                        b = a.getContentElement('info', 'cmbName'),
                        c = a.getContentElement('info', 'cmbValue');
                      j(b, 1, a.getParentEditor().document);
                      j(c, 1, a.getParentEditor().document);
                    }
                  }
                ]
              }
            ]
          },
          {
            type: 'hbox',
            widths: ['40%', '20%', '40%'],
            children: [
              {
                type: 'button',
                id: 'btnSetValue',
                label: c.lang.forms.select.btnSetValue,
                title: c.lang.forms.select.btnSetValue,
                onClick: function () {
                  var a = this.getDialog(),
                    b = a.getContentElement('info', 'cmbValue');
                  a.getContentElement('info', 'txtValue').setValue(b.getValue());
                }
              },
              {
                type: 'button',
                id: 'btnDelete',
                label: c.lang.forms.select.btnDelete,
                title: c.lang.forms.select.btnDelete,
                onClick: function () {
                  var a = this.getDialog(),
                    b = a.getContentElement('info', 'cmbName'),
                    c = a.getContentElement('info', 'cmbValue'),
                    d = a.getContentElement('info', 'txtOptName'),
                    a = a.getContentElement('info', 'txtOptValue');
                  m(b);
                  m(c);
                  d.setValue('');
                  a.setValue('');
                }
              },
              {
                id: 'chkMulti',
                type: 'checkbox',
                label: c.lang.forms.select.chkMulti,
                default: '',
                accessKey: 'M',
                value: 'checked',
                setup: function (a, b) {
                  'select' == a && this.setValue(b.getAttribute('multiple'));
                  CKEDITOR.env.webkit &&
                    this.getElement().getParent().setStyle('vertical-align', 'middle');
                },
                commit: function (a) {
                  this.getValue()
                    ? a.setAttribute('multiple', this.getValue())
                    : a.removeAttribute('multiple');
                }
              }
            ]
          }
        ]
      }
    ]
  };
});
