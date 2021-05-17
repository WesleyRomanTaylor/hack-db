CREATE TABLE submissions (
        id UUID primary key,
        title citext NOT NULL UNIQUE,
        submission text NOT NULL,
        submitted_by text NOT NULL,
        tags text,
        votes integer NOT NULL DEFAULT 1,
        created_at timestamptz NOT NULL DEFAULT current_timestamp,
        updated_at timestamptz NOT NULL DEFAULT current_timestamp,
);

CREATE TRIGGER submissions_update
        BEFORE UPDATE OF tags, votes ON submissions
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();