import redisClient from '../redis/client';
import { Nohm } from 'nohm';

const PREFIX = 'oni-on-cheese';
Nohm.setPrefix(PREFIX);
Nohm.setClient(redisClient);

export default Nohm;