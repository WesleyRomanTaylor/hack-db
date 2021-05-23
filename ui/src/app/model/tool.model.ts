import {TagModel} from "./tag.model";

export class ToolModel {
  id?: string;
  title: string;
  tool_code: string;
  created_by: string;
  description: string;
  tags: string[];
  vote_count?: number;
  broken_count?: number;

  constructor(
    title: string,
    tool_code: string,
    created_by: string,
    description: string,
    tags: string[],
    vote_count?: number,
    broken_count?: number,
    id?: string,
) {
    if(id) this.id = id;
    this.title = title;
    this.tool_code = tool_code;
    this.created_by = created_by;
    this.description = description;
    this.tags = tags;
    if(vote_count) this.vote_count = vote_count;
    if(broken_count) this.broken_count = broken_count;
  }
}
