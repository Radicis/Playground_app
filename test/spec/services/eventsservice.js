'use strict';

describe('Service: eventsService', function () {

  // load the service's module
  beforeEach(module('playgroundApp'));

  // instantiate service
  var eventsService;
  beforeEach(inject(function (_eventsService_) {
    eventsService = _eventsService_;
  }));

  it('should do something', function () {
    expect(!!eventsService).toBe(true);
  });

});
