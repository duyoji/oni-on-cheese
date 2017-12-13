import apiRoomsRouter from '../../../api/rooms/router';
import * as apiRoomsController from '../../../api/rooms/controller';

describe('resources/api/router.js', () => {
  it('should exist.', () => {
    expect(typeof apiRoomsRouter).toEqual('function');
  });

  it('should have get method when accessing `/`', () => {
    const routeForRooms = apiRoomsRouter.stack[0].route;
    const expectedMethods = ['get'];

    expect(routeForRooms.path).toEqual('/');
    expectedMethods.forEach(method => {
      expect(routeForRooms.methods[method]).toEqual(true);
    });
  });

  it('should map proper controller methods to each method', () => {
    const routeForRooms = apiRoomsRouter.stack[0].route;
    const expectedMethodMap = {
      get: apiRoomsController.getRooms,
    };

    for(let method in expectedMethodMap) {
      const targetLayer = routeForRooms.stack.find(layer => method === layer.method);
      expect(targetLayer.handle).toEqual(expectedMethodMap[method]);
    }
  });
});