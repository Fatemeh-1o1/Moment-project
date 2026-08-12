import {readFile} from 'node:fs/promises';import {fileURLToPath} from 'node:url';import {db} from './client.js';
const sql=await readFile(fileURLToPath(new URL('./schema.sql',import.meta.url)),'utf8');await db.query(sql);await db.end();console.log('Database ready');
