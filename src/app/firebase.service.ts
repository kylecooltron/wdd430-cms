import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  baseUrl: string = "https://cms-wdd-430-default-rtdb.firebaseio.com/";
  DOCUMENTS_TABLE = "documents"
  CONTACTS_TABLE = "contacts"
  MESSAGES_TABLE = "messages"

  getUrl(database: string): string {
    return this.baseUrl + database + ".json";
  }
}
