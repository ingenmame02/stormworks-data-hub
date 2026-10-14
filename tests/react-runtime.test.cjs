const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

test('React renders a server-side component tree', () => {
  const markup = renderToStaticMarkup(
    React.createElement('main', null, React.createElement('h1', null, 'Radar Simulator'))
  );

  assert.match(markup, /<h1>Radar Simulator<\/h1>/);
});
