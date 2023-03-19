import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalhostService {
  baseUrl: string = "http://127.0.0.1:3000/";
  DOCUMENTS_TABLE = "documents/"
  CONTACTS_TABLE = "contacts/"
  MESSAGES_TABLE = "messages/"

  getUrl(database: string): string {
    return this.baseUrl + database;
  }
}
