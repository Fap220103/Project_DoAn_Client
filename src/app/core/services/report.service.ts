import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';
import { BestSellingProduct, RevenueDto } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService<any> {
  constructor(http: HttpClient, injector: Injector) {
    super(http, Constants.Report.Resource, injector);
  }

  getStatisticalData(fromDate?: string, toDate?: string): Observable<any> {
    const params: any = {};
    if (fromDate) {
      params.FromDate = fromDate; 
    }
    if (toDate) {
      params.ToDate = toDate;
    }
    return this.http.get<RevenueDto[]>(`${this.svUrl}/GetRevenue`, { params });
  }
  getBestSellingProducts(): Observable<BestSellingProduct[]> {
    return this.http.get<BestSellingProduct[]>(`${this.svUrl}/BestSeller`);
  }

  getReport(fromDate?: string, toDate?: string, userId?: string): Observable<any> {
    const params: any = {};
    if (fromDate) {
      params.FromDate = fromDate; 
    }
    if (toDate) {
      params.ToDate = toDate;
    }
    params.CreatedId = userId;
    return this.http.get<RevenueDto[]>(`${this.svUrl}`, { params });
  }
}
