import { createRoom } from '../socketHandlers/createRoom';

export function createGame () {
  createRoom;
  return {
    type: 'CREATE_GAME'
  }
}