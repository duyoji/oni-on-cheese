import socket from '../../socketHandlers/index';

describe('src/socketHandlers/index.js', () => {

  afterAll(() => {
    socket.disconnect();
  });

  it('should be object of socket.io-client.', () => {
    const splittedNameSpace = socket.nsp.split('/');
    expect(splittedNameSpace[splittedNameSpace.length - 1]).toEqual('game');
  });
});