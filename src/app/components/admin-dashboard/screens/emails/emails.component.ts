import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { EmailService } from '../../../../service/email.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css'
})
export class EmailsComponent {
  emails: any[] = [];
  isLoading: boolean = false;
  constructor(private emailService: EmailService) { }
  ngOnInit() {
    this.loadEmail();
  }

  loadEmail() {
    this.isLoading = true;
    this.emailService.getEmails().subscribe( {
      next: (res: any) => {
        this.emails = res;
        console.log('emails :: ', this.emails);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error("Error loading emails", error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  downloadEmails() {
    const filteredEmails = this.emails.map(email => ({
      Name: email.name,
      Email: email.email,
      Subject: email.subject,
      Message: email.message,
      Phone: email.phone
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredEmails);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'emails');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
