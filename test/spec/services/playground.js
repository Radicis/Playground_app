'use strict';

describe('Service: playground', function () {

  // load the service's module
  beforeEach(module('playgroundApp'));

  // instantiate service
  var playground;
  beforeEach(inject(function (_playground_) {
    playground = _playground_;
  }));

  it('should do something', function () {
    expect(!!playground).toBe(true);
  });

});
