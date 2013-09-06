var model = require('modella')
  , defaults = require('../')
  , assert = require('assert');


describe('modella-defaults', function () {
  it('should add default values', function () {
    var User = model('User')
      .use(defaults)
      .attr('name', { 'default' : 'Calvin' })
      .attr('age');

    var user = new User({ age : 23 });
    assert(user.name() === 'Calvin');
    assert(user.age() === 23);
  });


  it('should not override existing values', function () {
    var User = model('User')
      .use(defaults)
      .attr('name', { 'default' : 'Calvin' });

    var user = new User({ name : 'Ian' });
    assert(user.name() === 'Ian');
  });


  it('should add falsey values', function () {
    var User = model('User')
      .use(defaults)
      .attr('isAdmin', { 'default' : false });

    var user = new User();
    assert(user.isAdmin() === false);
    user = new User({ isAdmin : true });
    assert(user.isAdmin() === true);
  });


  it('should accept functions', function () {
    var User = model('User')
      .use(defaults)
      .attr('name', { 'default' : function () { return 'toothless'; }});

    var user = new User();
    assert(user.name() === 'toothless');
  });

  it('should run functions in the right context', function () {
    var User = model('User')
      .use(defaults)
      .attr('firstName', { 'default' : function () { return this.name().split(' ')[0] }})
      .attr('name');

    var user = new User({ name : 'Calvin French-Owen' });
    assert(user.firstName() === 'Calvin');
  });

  it('should return clones of objects', function () {
    var User = model('User')
      .use(defaults)
      .attr('items', { 'default' : ['Boots of charisma', 'Hammer of justice']});

    var user1 = new User()
      , user2 = new User();

    assert(user1.attrs.items !== user2.attrs.items);
    user1.attrs.items.pop();
    assert(user1.items().length !== user2.items().length);
  });
});