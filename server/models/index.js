import { getRedisClient } from '../redis/client';
import { Nohm } from 'nohm';

const PREFIX = 'oni-on-cheese';
Nohm.setPrefix(PREFIX);

// NOTE:
// Instead of using Nohm.setClient,
// assign a redis client to static variable of Nohm to avoid bellow error.
//
// TODO: Fix below error and use Nohm.setClient
Nohm.client = getRedisClient();

// TypeError: stream.removeListener is not a function
// at write (console.js:116:12)
// at BufferedConsole.dir (console.js:150:3)
// at Function.logError (node_modules/nohm/lib/nohm.js:153:13)
// Nohm.setClient(getRedisClient());

export default Nohm;