CREATE EXTENSION IF NOT EXISTS citext;

CREATE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
        NEW.updated_at = now();
        RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';