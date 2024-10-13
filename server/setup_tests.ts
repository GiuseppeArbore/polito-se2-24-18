require('ts-node/register')
import db from './src/db/db'

import { setDefaultResultOrder } from 'dns'
setDefaultResultOrder("ipv4first");

// Always open the db before starting tests. Not always necessary, but
// potentially avoids mistakes
global.beforeAll(async () => {
    await db.open()
})
