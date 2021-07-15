import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAudit } from './audit.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private _http: HttpClient) { }
  createAuditItem(auditItem: IAudit) {
    return this._http.post<IAudit>('http://localhost:3000/audit', auditItem)
  }
}
