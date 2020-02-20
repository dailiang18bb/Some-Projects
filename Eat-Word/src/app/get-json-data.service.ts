import { Injectable } from '@angular/core';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GetJsonDataService {

  readonly key: string = 'e0e752ee-7a6d-42d0-b964-14da44ff760c'
  readonly baseURL: string = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'
  // private remoteURL:string = 'https://www.reddit.com/r/gifs/new/.json?limit=10';
  //https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=e0e752ee-7a6d-42d0-b964-14da44ff760c

  constructor(private http: HttpClient) { }

  getRemoteData(w): Observable<any> {
    return this.http.get(this.getWordRequestURL(w));
  }

  getWordRequestURL(w): string {
    return this.baseURL + w + '?key=' + this.key;
  }
}
