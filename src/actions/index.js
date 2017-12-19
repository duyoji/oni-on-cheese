import { createRoom } from '../utils/index';

export function createGame () {
  createRoom();
  return {
    type: 'CREATE_GAME'
  }
}