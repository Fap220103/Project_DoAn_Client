import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../../../core/services/report.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
import { BestSellingProduct, RevenueDto } from '../../../../core/models/report.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, AfterViewInit {
  chart: any;
  fromDate: string = '';
  toDate: string = '';
  tableData: { date: string; doanhThu: number; loiNhuan: number }[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    // Không cần gọi loadData trong ngOnInit, chỉ gọi khi nhấn Lọc
  }

  ngAfterViewInit(): void {
    // Sử dụng ngAfterViewInit nếu cần
    this.loadData();

    this.loadBestSellingProducts();
  }

  loadData(): void {
    this.reportService.getStatisticalData(this.fromDate, this.toDate).subscribe((rs: any) => {
      const dates = rs.content.data.map((item: RevenueDto) => this.formatDate(item.date));
      const doanhThu = rs.content.data.map((item: RevenueDto) => item.doanhThu);
      const loiNhuan = rs.content.data.map((item: RevenueDto) => item.loiNhuan);

      this.tableData = rs.content.data.map((item: RevenueDto) => ({
        date: this.formatDate(item.date),
        doanhThu: item.doanhThu,
        loiNhuan: item.loiNhuan
      }));

      this.createChart(dates, doanhThu, loiNhuan);
    });
  }
  formatDate(date: string): string {
    const parsedDate = new Date(date); // Chuyển đổi chuỗi date thành đối tượng Date
    const day = String(parsedDate.getDate()).padStart(2, '0'); // Lấy ngày, đảm bảo có 2 chữ số
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Lấy tháng, thêm 1 vì tháng trong JavaScript bắt đầu từ 0
    const year = parsedDate.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về ngày theo định dạng dd/mm/yyyy
  }
  createChart(dates: string[], doanhThu: number[], loiNhuan: number[]): void {
    const chartData = {
      labels: dates,
      datasets: [
        {
          label: 'Doanh Thu',
          data: doanhThu,
          backgroundColor: 'rgba(210, 214, 222, 1)',
          borderColor: 'rgba(210, 214, 222, 1)'
        },
        {
          label: 'Lợi Nhuận',
          data: loiNhuan,
          backgroundColor: 'rgba(60, 141, 188, 0.9)',
          borderColor: 'rgba(60, 141, 188, 0.8)'
        }
      ]
    };

    // Nếu biểu đồ đã có, phá hủy và tạo lại
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    // Thiết lập chiều cao lại mỗi lần tạo mới
    ctx.style.height = '250px';
    ctx.style.minHeight = '250px';

    // Tạo lại biểu đồ với dữ liệu mới
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  loadBestSellingProducts(): void {
    this.reportService.getBestSellingProducts().subscribe((rs: any) => {
      const labels = rs.content.data.map((item: any) => item.productName);
      const data = rs.content.data.map((item: any) => item.quantitySold); // hoặc item.labels nếu đó là số lượng
      const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc']
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true
        }
      });
    });
  }
}
