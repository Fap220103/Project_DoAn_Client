﻿/*
 Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.setLang('a11yhelp', 'vi', {
  title: 'Hướng dẫn trợ năng',
  contents: 'Nội dung Hỗ trợ. Nhấn ESC để đóng hộp thoại.',
  legend: [
    {
      name: 'Chung',
      items: [
        {
          name: 'Thanh công cụ soạn thảo',
          legend:
            'Nhấn ${toolbarFocus} để điều hướng đến thanh công cụ. Nhấn TAB và SHIFT-TAB để chuyển đến nhóm thanh công cụ khác. Nhấn MŨI TÊN PHẢI hoặc MŨI TÊN TRÁI để chuyển sang nút khác trên thanh công cụ. Nhấn PHÍM CÁCH hoặc ENTER để kích hoạt nút trên thanh công cụ.'
        },
        {
          name: 'Hộp thoại Biên t',
          legend:
            'Bên trong một hộp thoại, nhấn TAB để chuyển sang trường tiếp theo, nhấn SHIFT + TAB để quay lại trường phía trước, nhấn ENTER để chấp nhận, nhấn ESC để đóng hộp thoại. Đối với các hộp thoại có nhiều tab, nhấn ALT + F10 để chuyển đến danh sách các tab. Sau đó nhấn TAB hoặc MŨI TÊN SANG PHẢI để chuyển sang tab tiếp theo. Nhấn SHIFT + TAB hoặc MŨI TÊN SANG TRÁI để chuyển sang tab trước đó. Nhấn DẤU CÁCH hoặc ENTER để chọn tab.'
        },
        {
          name: 'Trình đơn Ngữ cảnh cBộ soạn thảo',
          legend:
            'Nhấn ${contextMenu} hoặc PHÍM ỨNG DỤNG để mở thực đơn ngữ cảnh. Sau đó nhấn TAB hoặc MŨI TÊN XUỐNG để di chuyển đến tuỳ chọn tiếp theo của thực đơn. Nhấn SHIFT+TAB hoặc MŨI TÊN LÊN để quay lại tuỳ chọn trước. Nhấn DẤU CÁCH hoặc ENTER để chọn tuỳ chọn của thực đơn. Nhấn DẤU CÁCH hoặc ENTER hoặc MŨI TÊN SANG PHẢI để mở thực đơn con của tuỳ chọn hiện tại. Nhấn ESC hoặc MŨI TÊN SANG TRÁI để quay trở lại thực đơn gốc. Nhấn ESC để đóng thực đơn ngữ cảnh.'
        },
        {
          name: 'Hộp danh sách trình biên tập',
          legend:
            'Trong một danh sách chọn, di chuyển đối tượng tiếp theo với phím Tab hoặc phím mũi tên hướng xuống. Di chuyển đến đối tượng trước đó bằng cách nhấn tổ hợp phím Shift+Tab hoặc mũi tên hướng lên. Phím khoảng cách hoặc phím Enter để chọn các tùy chọn trong danh sách. Nhấn phím Esc để đóng lại danh sách chọn.'
        },
        {
          name: 'Thanh đường dẫn các đối tượng',
          legend:
            'Nhấn ${elementsPathFocus} để điều hướng các đối tượng trong thanh đường dẫn. Di chuyển đến đối tượng tiếp theo bằng phím Tab hoặc phím mũi tên bên phải. Di chuyển đến đối tượng trước đó bằng tổ hợp phím Shift+Tab hoặc phím mũi tên bên trái. Nhấn phím khoảng cách hoặc Enter để chọn đối tượng trong trình soạn thảo.'
        }
      ]
    },
    {
      name: 'Lệnh',
      items: [
        { name: 'Làm lại lện', legend: 'Ấn ${undo}' },
        { name: 'Làm lại lệnh', legend: 'Ấn ${redo}' },
        { name: 'Lệnh in đậm', legend: 'Ấn ${bold}' },
        { name: 'Lệnh in nghiêng', legend: 'Ấn ${italic}' },
        { name: 'Lệnh gạch dưới', legend: 'Ấn ${underline}' },
        { name: 'Lệnh liên kết', legend: 'Nhấn ${link}' },
        { name: 'Lệnh hiển thị thanh công cụ', legend: 'Nhấn${toolbarCollapse}' },
        {
          name: 'Truy cập đến lệnh tập trung vào khoảng cách trước đó',
          legend:
            'Ấn ${accessPreviousSpace} để truy cập đến phần tập trung khoảng cách sau phần còn sót lại của khoảng cách gần nhất vốn không tác động đến được , thí dụ: hai yếu tố điều chỉnh HR. Lặp lại các phím kết họep này để vươn đến phần khoảng cách.'
        },
        {
          name: 'Truy cập phần đối tượng lệnh khoảng trống',
          legend:
            'Ấn ${accessNextSpace} để truy cập đến phần tập trung khoảng cách sau phần còn sót lại của khoảng cách gần nhất vốn không tác động đến được , thí dụ: hai yếu tố điều chỉnh HR. Lặp lại các phím kết họep này để vươn đến phần khoảng cách.'
        },
        { name: 'Trợ giúp liên quan', legend: 'Nhấn ${a11yHelp}' }
      ]
    }
  ]
});
