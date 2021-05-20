export class CommentModel {
  id: string;
  comment: string;
  created_by: string;

  constructor(
    id: string,
    created_by: string,
    comment: string,
  ) {
    this.id = id;
    this.created_by = created_by;
    this.comment = comment;
  }
}
