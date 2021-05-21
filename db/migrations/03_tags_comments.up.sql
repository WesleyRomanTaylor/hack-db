CREATE TABLE tags (
        id UUID primary key DEFAULT uuid_generate_v1(),
        name citext NOT NULL UNIQUE,
        tool_id UUID[],
        created_at timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE comments (
        id UUID primary key DEFAULT uuid_generate_v1(),
        comment text NOT NULL,
        created_by text NOT NULL,
        tool_id UUID NOT NULL,
        created_at timestamptz NOT NULL DEFAULT current_timestamp
);