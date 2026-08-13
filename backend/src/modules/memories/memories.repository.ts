import { db } from '../../database/client.js';

export const memoriesRepository = {
  list: async (userId: string) =>
    (
      await db.query(
        `SELECT m.id, m.content, m.mood, 
          to_char(m.memory_date, 'YYYY-MM-DD') AS "memoryDate",
          m.is_special AS "isSpecial",
          m.created_at AS "createdAt", 
          m.updated_at AS "updatedAt",
          COALESCE(json_agg(json_build_object('id', x.id, 'type', x.type, 'url', x.url)) FILTER (WHERE x.id IS NOT NULL), '[]') AS media 
        FROM memories m 
        LEFT JOIN media x ON x.memory_id = m.id 
        WHERE m.user_id = $1 
        GROUP BY m.id 
        ORDER BY m.memory_date DESC, m.created_at DESC`,
        [userId]
      )
    ).rows,

  create: async (
    userId: string,
    x: { content: string; mood: string; memoryDate: string; isSpecial?: boolean }
  ) =>
    (
      await db.query(
        `INSERT INTO memories(user_id, content, mood, memory_date, is_special) 
         VALUES($1, $2, $3, $4, COALESCE($5, false)) 
         RETURNING id, content, mood, 
           to_char(memory_date, 'YYYY-MM-DD') AS "memoryDate",
           is_special AS "isSpecial",
           created_at AS "createdAt", 
           updated_at AS "updatedAt"`,
        [userId, x.content, x.mood, x.memoryDate, x.isSpecial]
      )
    ).rows[0],

  update: async (
    userId: string,
    id: string,
    x: { content?: string; mood?: string; memoryDate?: string; isSpecial?: boolean }
  ) =>
    (
      await db.query(
        `UPDATE memories 
         SET content = COALESCE($3, content),
             mood = COALESCE($4, mood),
             memory_date = COALESCE($5::date, memory_date),
             is_special = COALESCE($6::boolean, is_special),
             updated_at = now() 
         WHERE id = $1 AND user_id = $2 
         RETURNING id, content, mood, 
           to_char(memory_date, 'YYYY-MM-DD') AS "memoryDate",
           is_special AS "isSpecial",
           created_at AS "createdAt", 
           updated_at AS "updatedAt"`,
        [id, userId, x.content, x.mood, x.memoryDate, x.isSpecial]
      )
    ).rows[0],

  remove: (userId: string, id: string) =>
    db.query('DELETE FROM memories WHERE id = $1 AND user_id = $2', [id, userId]),

  owns: async (userId: string, id: string) =>
    !!(
      await db.query('SELECT 1 FROM memories WHERE id = $1 AND user_id = $2', [id, userId])
    ).rows[0],

    addMedia: async (userId: string, memoryId: string, type: 'image' | 'video' | 'audio', url: string) => {    if (!(await memoriesRepository.owns(userId, memoryId))) return null;
    return (
      await db.query(
        `INSERT INTO media(memory_id, type, url) VALUES($1, $2, $3) RETURNING id, type, url`,
        [memoryId, type, url]
      )
    ).rows[0];
  },
};