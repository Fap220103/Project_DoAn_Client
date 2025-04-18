﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add('cellProperties', function (f) {
  var g = f.lang.table,
    c = g.cell,
    d = f.lang.common,
    h = CKEDITOR.dialog.validate,
    j = /^(\d+(?:\.\d+)?)(px|%)$/,
    e = { type: 'html', html: '&nbsp;' },
    k = 'rtl' == f.lang.dir,
    i = f.plugins.colordialog;
  return {
    title: c.title,
    minWidth: CKEDITOR.env.ie && CKEDITOR.env.quirks ? 450 : 410,
    minHeight: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? 230 : 220,
    contents: [
      {
        id: 'info',
        label: c.title,
        accessKey: 'I',
        elements: [
          {
            type: 'hbox',
            widths: ['40%', '5%', '40%'],
            children: [
              {
                type: 'vbox',
                padding: 0,
                children: [
                  {
                    type: 'hbox',
                    widths: ['70%', '30%'],
                    children: [
                      {
                        type: 'text',
                        id: 'width',
                        width: '100px',
                        label: d.width,
                        validate: h.number(c.invalidWidth),
                        onLoad: function () {
                          var a = this.getDialog()
                              .getContentElement('info', 'widthType')
                              .getElement(),
                            b = this.getInputElement(),
                            c = b.getAttribute('aria-labelledby');
                          b.setAttribute('aria-labelledby', [c, a.$.id].join(' '));
                        },
                        setup: function (a) {
                          var b = parseInt(a.getAttribute('width'), 10),
                            a = parseInt(a.getStyle('width'), 10);
                          !isNaN(b) && this.setValue(b);
                          !isNaN(a) && this.setValue(a);
                        },
                        commit: function (a) {
                          var b = parseInt(this.getValue(), 10),
                            c = this.getDialog().getValueOf('info', 'widthType');
                          isNaN(b) ? a.removeStyle('width') : a.setStyle('width', b + c);
                          a.removeAttribute('width');
                        },
                        default: ''
                      },
                      {
                        type: 'select',
                        id: 'widthType',
                        label: f.lang.table.widthUnit,
                        labelStyle: 'visibility:hidden',
                        default: 'px',
                        items: [
                          [g.widthPx, 'px'],
                          [g.widthPc, '%']
                        ],
                        setup: function (a) {
                          (a = j.exec(a.getStyle('width') || a.getAttribute('width'))) &&
                            this.setValue(a[2]);
                        }
                      }
                    ]
                  },
                  {
                    type: 'hbox',
                    widths: ['70%', '30%'],
                    children: [
                      {
                        type: 'text',
                        id: 'height',
                        label: d.height,
                        width: '100px',
                        default: '',
                        validate: h.number(c.invalidHeight),
                        onLoad: function () {
                          var a = this.getDialog()
                              .getContentElement('info', 'htmlHeightType')
                              .getElement(),
                            b = this.getInputElement(),
                            c = b.getAttribute('aria-labelledby');
                          b.setAttribute('aria-labelledby', [c, a.$.id].join(' '));
                        },
                        setup: function (a) {
                          var b = parseInt(a.getAttribute('height'), 10),
                            a = parseInt(a.getStyle('height'), 10);
                          !isNaN(b) && this.setValue(b);
                          !isNaN(a) && this.setValue(a);
                        },
                        commit: function (a) {
                          var b = parseInt(this.getValue(), 10);
                          isNaN(b)
                            ? a.removeStyle('height')
                            : a.setStyle('height', CKEDITOR.tools.cssLength(b));
                          a.removeAttribute('height');
                        }
                      },
                      { id: 'htmlHeightType', type: 'html', html: '<br />' + g.widthPx }
                    ]
                  },
                  e,
                  {
                    type: 'select',
                    id: 'wordWrap',
                    label: c.wordWrap,
                    default: 'yes',
                    items: [
                      [c.yes, 'yes'],
                      [c.no, 'no']
                    ],
                    setup: function (a) {
                      var b = a.getAttribute('noWrap');
                      ('nowrap' == a.getStyle('white-space') || b) && this.setValue('no');
                    },
                    commit: function (a) {
                      'no' == this.getValue()
                        ? a.setStyle('white-space', 'nowrap')
                        : a.removeStyle('white-space');
                      a.removeAttribute('noWrap');
                    }
                  },
                  e,
                  {
                    type: 'select',
                    id: 'hAlign',
                    label: c.hAlign,
                    default: '',
                    items: [
                      [d.notSet, ''],
                      [d.alignLeft, 'left'],
                      [d.alignCenter, 'center'],
                      [d.alignRight, 'right']
                    ],
                    setup: function (a) {
                      var b = a.getAttribute('align');
                      this.setValue(a.getStyle('text-align') || b || '');
                    },
                    commit: function (a) {
                      var b = this.getValue();
                      b ? a.setStyle('text-align', b) : a.removeStyle('text-align');
                      a.removeAttribute('align');
                    }
                  },
                  {
                    type: 'select',
                    id: 'vAlign',
                    label: c.vAlign,
                    default: '',
                    items: [
                      [d.notSet, ''],
                      [d.alignTop, 'top'],
                      [d.alignMiddle, 'middle'],
                      [d.alignBottom, 'bottom'],
                      [c.alignBaseline, 'baseline']
                    ],
                    setup: function (a) {
                      var b = a.getAttribute('vAlign'),
                        a = a.getStyle('vertical-align');
                      switch (a) {
                        case 'top':
                        case 'middle':
                        case 'bottom':
                        case 'baseline':
                          break;
                        default:
                          a = '';
                      }
                      this.setValue(a || b || '');
                    },
                    commit: function (a) {
                      var b = this.getValue();
                      b ? a.setStyle('vertical-align', b) : a.removeStyle('vertical-align');
                      a.removeAttribute('vAlign');
                    }
                  }
                ]
              },
              e,
              {
                type: 'vbox',
                padding: 0,
                children: [
                  {
                    type: 'select',
                    id: 'cellType',
                    label: c.cellType,
                    default: 'td',
                    items: [
                      [c.data, 'td'],
                      [c.header, 'th']
                    ],
                    setup: function (a) {
                      this.setValue(a.getName());
                    },
                    commit: function (a) {
                      a.renameNode(this.getValue());
                    }
                  },
                  e,
                  {
                    type: 'text',
                    id: 'rowSpan',
                    label: c.rowSpan,
                    default: '',
                    validate: h.integer(c.invalidRowSpan),
                    setup: function (a) {
                      (a = parseInt(a.getAttribute('rowSpan'), 10)) && 1 != a && this.setValue(a);
                    },
                    commit: function (a) {
                      var b = parseInt(this.getValue(), 10);
                      b && 1 != b
                        ? a.setAttribute('rowSpan', this.getValue())
                        : a.removeAttribute('rowSpan');
                    }
                  },
                  {
                    type: 'text',
                    id: 'colSpan',
                    label: c.colSpan,
                    default: '',
                    validate: h.integer(c.invalidColSpan),
                    setup: function (a) {
                      (a = parseInt(a.getAttribute('colSpan'), 10)) && 1 != a && this.setValue(a);
                    },
                    commit: function (a) {
                      var b = parseInt(this.getValue(), 10);
                      b && 1 != b
                        ? a.setAttribute('colSpan', this.getValue())
                        : a.removeAttribute('colSpan');
                    }
                  },
                  e,
                  {
                    type: 'hbox',
                    padding: 0,
                    widths: ['60%', '40%'],
                    children: [
                      {
                        type: 'text',
                        id: 'bgColor',
                        label: c.bgColor,
                        default: '',
                        setup: function (a) {
                          var b = a.getAttribute('bgColor');
                          this.setValue(a.getStyle('background-color') || b);
                        },
                        commit: function (a) {
                          this.getValue()
                            ? a.setStyle('background-color', this.getValue())
                            : a.removeStyle('background-color');
                          a.removeAttribute('bgColor');
                        }
                      },
                      i
                        ? {
                            type: 'button',
                            id: 'bgColorChoose',
                            class: 'colorChooser',
                            label: c.chooseColor,
                            onLoad: function () {
                              this.getElement().getParent().setStyle('vertical-align', 'bottom');
                            },
                            onClick: function () {
                              f.getColorFromDialog(function (a) {
                                a &&
                                  this.getDialog().getContentElement('info', 'bgColor').setValue(a);
                                this.focus();
                              }, this);
                            }
                          }
                        : e
                    ]
                  },
                  e,
                  {
                    type: 'hbox',
                    padding: 0,
                    widths: ['60%', '40%'],
                    children: [
                      {
                        type: 'text',
                        id: 'borderColor',
                        label: c.borderColor,
                        default: '',
                        setup: function (a) {
                          var b = a.getAttribute('borderColor');
                          this.setValue(a.getStyle('border-color') || b);
                        },
                        commit: function (a) {
                          this.getValue()
                            ? a.setStyle('border-color', this.getValue())
                            : a.removeStyle('border-color');
                          a.removeAttribute('borderColor');
                        }
                      },
                      i
                        ? {
                            type: 'button',
                            id: 'borderColorChoose',
                            class: 'colorChooser',
                            label: c.chooseColor,
                            style: (k ? 'margin-right' : 'margin-left') + ': 10px',
                            onLoad: function () {
                              this.getElement().getParent().setStyle('vertical-align', 'bottom');
                            },
                            onClick: function () {
                              f.getColorFromDialog(function (a) {
                                a &&
                                  this.getDialog()
                                    .getContentElement('info', 'borderColor')
                                    .setValue(a);
                                this.focus();
                              }, this);
                            }
                          }
                        : e
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    onShow: function () {
      this.cells = CKEDITOR.plugins.tabletools.getSelectedCells(this._.editor.getSelection());
      this.setupContent(this.cells[0]);
    },
    onOk: function () {
      for (
        var a = this._.editor.getSelection(), b = a.createBookmarks(), c = this.cells, d = 0;
        d < c.length;
        d++
      )
        this.commitContent(c[d]);
      this._.editor.forceNextSelectionCheck();
      a.selectBookmarks(b);
      this._.editor.selectionChange();
    }
  };
});
