'use strict';

describe('Directive: playgroundMap', function () {

  // load the directive's module
  beforeEach(module('playgroundApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<playground-map></playground-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the playgroundMap directive');
  }));
});
