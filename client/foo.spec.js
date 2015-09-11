/* globals window */

let describe = window.describe
let beforeEach = window.beforeEach
let it = window.it
let afterEach = window.afterEach
let sinon = window.sinon
let expect = window.chai.expect

import Foo from './foo'

describe('ES6 Foo', () => {
  let foo

  beforeEach(() => {
    foo = new Foo()
  })

  afterEach(() => {

  })


  it('should return "Do Something" when calling doSomething', () => {
    expect(foo.doSomething()).to.equal('Do Something')
  })
})
