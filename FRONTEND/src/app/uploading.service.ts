import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {
  constructor(private http: HttpClient) { }
  public uploadFormData(formData) {
    return this.http.post<any>('http://127.0.0.1:8000/authentication/post/file', formData);
  }
}
