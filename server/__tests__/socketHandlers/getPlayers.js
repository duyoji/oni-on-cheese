import { getPlayers } from '../../socketHandlers/getPlayers';
import {
  commonTestForSocketHandler,
  createDummySocket,
  createDummyNameSpace
} from '../helpers/socketHandlerHelper';

commonTestForSocketHandler( getPlayers );