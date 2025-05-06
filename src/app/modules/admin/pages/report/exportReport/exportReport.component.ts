import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from '../../../../../core/services/report.service';
import { AuthService } from '../../../../../core/services/auth.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-exportReport',
  templateUrl: './exportReport.component.html',
  styleUrls: ['./exportReport.component.scss']
})
export class ExportReportComponent implements OnInit {
  report: any;
  fromDate: string = '';
  toDate: string = '';
  @ViewChild('reportElement') reportElement!: ElementRef;

  constructor(
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData(); // Load báo cáo lần đầu khi vào trang
  }

  loadData(): void {
    const userId = this.authService.getUserId();
    this.reportService.getReport(this.fromDate, this.toDate, userId).subscribe({
      next: (res) => {
        this.report = res.content?.data;
      },
      error: (err) => {
        console.error('Lỗi lấy báo cáo:', err);
      }
    });
  }

  exportToPDF(): void {
    const report = this.reportElement.nativeElement;

    html2canvas(report, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${this.report?.reportTitle || 'report'}.pdf`);
    });
  }
}
