export class CommentModel {
  comment: string;
  created_by: string;

  constructor(
    id: string,
    created_by: string,
    comment: string,
  ) {
    this.created_by = created_by;
    this.comment = comment;
  }
}
