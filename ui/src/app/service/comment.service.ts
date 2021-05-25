import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsUrl = '/hack-db/v1/comment';
  private token = 'Token token=b4b2c7ea0d724cc3ac38686aac86a6b8';
  private headers = new HttpHeaders({Authorization: this.token})

  constructor(public http: HttpClient) {
  }

  getComments(toolId: string): Observable<any> {
    return this.http.get(`${this.commentsUrl}/${toolId}`, {headers: this.headers})
      .pipe(
        map((response: any) => response['results'])
      )
  }

  addComment(toolId: string, comment: string, createdBy: string): void {
    this.http.post(this.commentsUrl, {
      "comment": comment,
      "created_by": createdBy,
      "tool_id": toolId
    }, {headers: this.headers})
      .subscribe(data => {
        console.log(data);
      });
  }
}
