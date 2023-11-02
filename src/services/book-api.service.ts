import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookApiService {
constructor(private http : HttpClient) { }
  getBookDetails() {
    return this.http.get<any>("https://s3.amazonaws.com/api-fun/books.json").pipe(map((res:any)=>{
      return res;
    }))
}
}
