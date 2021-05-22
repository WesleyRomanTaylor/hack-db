export class ToolModel {
  id: string;
  title: string;
  content: string;
  created_by: string;
  description: string;
  tags?: string[];
  vote_count: number;
  broken_count: number;

  constructor(
    id: string,
    title: string,
    content: string,
    created_by: string,
    description: string,
    tags: string[],
    vote_count: number,
    broken_count: number
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.created_by = created_by;
    this.description = description;
    this.tags = tags;
    this.vote_count = vote_count;
    this.broken_count = broken_count;
  }
}
