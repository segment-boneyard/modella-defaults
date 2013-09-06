
/**
 * Return clone through npm or component
 */

var clone;

try {
  clone = require('clone');
} catch (e) {
  clone = require('clone-component');
}


var has = Object.hasOwnProperty;


/**
 * Module exports.
 */

module.exports = defaults;


/**
 * Add defaults to any attrs which have the .defaults key
 */

function defaults (Model) {
  Model.on('initialize', function (model) {
    for (var attr in Model.attrs) {
      if (has.call(model.attrs, attr)) continue;

      var options = Model.attrs[attr];
      if (!has.call(options, 'default')) continue;

      var value = options['default'];
      if (typeof value === 'function') value = value.apply(model);
      model.attrs[attr] = clone(value);
    }
  });

  return Model;
}


