import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private _http: HttpClient) {}

  addPost(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/posts', data);
  }

  updatePost(id: string, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/posts/${id}`, data);
  }

  getPostList(): Observable<any> {
    return this._http.get('http://localhost:3000/posts');
  }

  deletePost(id: string): Observable<any> {
    return this._http.delete(`http://localhost:3000/posts/${id}`);
  }
}
