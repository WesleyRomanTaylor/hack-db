CREATE TABLE tools (
        id UUID primary key,
        title citext NOT NULL UNIQUE,
        tool_code text NOT NULL,
        created_by text NOT NULL,
        description text NOT NULL,
        vote_count integer NOT NULL DEFAULT 1,
        broken_count integer NOT NULL DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT current_timestamp,
        updated_at timestamptz NOT NULL DEFAULT current_timestamp,
);

CREATE TRIGGER tools_update
        BEFORE UPDATE OF tags, votes ON tools
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();