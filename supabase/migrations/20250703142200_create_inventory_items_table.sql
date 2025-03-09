CREATE TABLE IF NOT EXISTS inventory_items (
        id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name text NOT NULL,
        quantity integer NOT NULL DEFAULT 1,
        created_at timestamptz DEFAULT now()
    );

    ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Allow public access to inventory items"
    ON inventory_items
    FOR ALL
    TO public
    USING (true);
