import db from '../db';

async function seed() {
  const experiences = [
    {
      title: 'Sunset Kayaking',
      description: 'Guided sunset kayaking with snacks included.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      price: 1200
    },
    {
      title: 'Mountain Trekking',
      description: 'Half-day trekking with an experienced guide.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
      price: 1800
    }
  ];

  for (const e of experiences) {
    const r = await db.query('INSERT INTO experiences (title, description, image, price) VALUES ($1,$2,$3,$4) RETURNING id', [e.title, e.description, e.image, e.price]);
    const expId = r.rows[0].id;

    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().slice(0,10);
      await db.query('INSERT INTO slots (experience_id, slot_date, slot_time, capacity) VALUES ($1,$2,$3,$4)', [expId, dateStr, '09:00:00', 6]);
      await db.query('INSERT INTO slots (experience_id, slot_date, slot_time, capacity) VALUES ($1,$2,$3,$4)', [expId, dateStr, '15:00:00', 6]);
    }
  }

  await db.query("INSERT INTO promos (code, type, value) VALUES ('SAVE10','percent',10) ON CONFLICT DO NOTHING");
  await db.query("INSERT INTO promos (code, type, value) VALUES ('FLAT100','flat',100) ON CONFLICT DO NOTHING");

  console.log('Seed complete');
}

seed().catch(err => console.error(err)).finally(() => process.exit());
