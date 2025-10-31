-- experiences
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price INTEGER NOT NULL
);

-- slots
CREATE TABLE IF NOT EXISTS slots (
  id SERIAL PRIMARY KEY,
  experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 10
);

-- bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
  slot_id INTEGER REFERENCES slots(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  total_price INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- promos
CREATE TABLE IF NOT EXISTS promos (
  code TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  value INTEGER NOT NULL
);
