CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO clients (name, email)
VALUES
  ('Maria Silva', 'maria.silva@example.com'),
  ('João Costa', 'joao.costa@example.com'),
  ('Ana Matos', 'ana.matos@example.com'),
  ('Carlos Rocha', 'carlos.rocha@example.com'),
  ('Rita Fernandes', 'rita.fernandes@example.com');
