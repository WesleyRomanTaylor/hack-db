import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {ToolModel} from "../model/tool.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private toolUrl = '/hack-db/v1/tool';
  private token = "Token token=b4b2c7ea0d724cc3ac38686aac86a6b8";
  private headers = new HttpHeaders({Authorization: this.token})

  constructor(public http: HttpClient) {
  }

  getTools(): Observable<ToolModel[]> {
    return this.http.get(this.toolUrl, {headers: this.headers})
      .pipe(
        map((response: any) => response['results'])
      )
  }

  saveTool(tool: any): Observable<any> {
    return this.http.post(this.toolUrl, tool, {headers: this.headers})
  }
}
