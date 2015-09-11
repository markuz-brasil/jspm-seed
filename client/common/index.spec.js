/* globals window */
let describe = window.describe
let beforeEach = window.beforeEach
let afterEach = window.afterEach
let it = window.it
let sinon = window.sinon
let expect = window.chai.expect

import di from './di/index'

let { annotate } = di


describe('di framework', function () {
  afterEach(() => {
    di.annotations.clear()
  })

  it('should be properly defined', () => {
    expect(di.providers).to.be.an('array')
    expect(di.handlers).to.be.instanceof(Map)
    expect(di.annotations).to.be.instanceof(Map)
    expect(di.Injector).to.be.a('function')
    expect(di.annotate).to.be.a('function')
    expect(di.getAnnotations).to.be.a('function')
    expect(di.Inject).to.be.a('function')
    expect(di.InjectLazy).to.be.a('function')
    expect(di.Provide).to.be.a('function')
    expect(di.AddProvider).to.be.a('function')
    expect(di.Sync).to.be.a('function')
  })

  describe('annotation handlers', () => {
    expect(di.handlers.has(di.AddProvider)).to.equal(true)
    di.handlers.get(di.AddProvider).forEach(handler => {
      expect(handler).to.be.a('function')
    })
  })

  describe('di.annotate()', () => {
    it('should add the annotated token as keys in di.annotations and the actual annotation as value', () => {
      di.annotate(fn, new di.Provide('a'))
      di.annotate(fn, new di.Provide('b'))
      function fn () {}

      for (let [target, annotations] of di.annotations) {
        expect(target).to.equal(fn)
        annotations.forEach((anno, i) => {
          expect(anno).to.be.instanceof(di.Provide)
          expect(anno).to.deep.equal({
            provide: i === 0 ? 'a' : 'b',
          })
        })
      }
    })
  })

  describe('let injector = new di.Injector()', () => {
    beforeEach(() => {
      this.injector = new di.Injector
    })

    it('should return an Injector instance', () => {
      expect(this.injector).to.be.instanceof(di.Injector)
    })

    it('should return a properly defined parent-less, provider-less injector', () => {
      let inj = this.injector

      expect(inj.get).to.be.a('function')
      expect(inj.getSync).to.be.a('function')
      expect(inj.getLazy).to.be.a('function')
      expect(inj.getLazySync).to.be.a('function')
      expect(inj.add).to.be.a('function')
      expect(inj.has).to.be.a('function')
      expect(inj.parent).to.equal(null)
      expect(inj.providers).to.be.instanceof(Map)
      expect(inj.providers.size).to.equal(0)
    })

    describe('injector.getSync()', () => {
      it('should work')
    })
  })

  describe('let injector = new di.Injector(provider, parent)', () => {
    beforeEach(() => {
      di.annotate(fn1, new di.Provide('a'))
      function fn1 () {
        return 'A'
      }

      di.annotate(fn2, new di.Provide('b'))
      di.annotate(fn2, new di.Inject('a'))
      di.annotate(fn2, new di.Inject('a'))
      di.annotate(fn2, new di.Inject('c'))
      function fn2 (fn1) {
        return `${fn1}-B`
      }

      let providers = [fn1]
      let parent = new di.Injector()

      this.fn1 = fn1
      this.fn2 = fn2
      this.injector = new di.Injector(providers, parent)
    })

    it('should return an Injector instance', () => {
      expect(this.injector).to.be.instanceof(di.Injector)
    })

    it('should return a properly defined injector', () => {
      let inj = this.injector

      expect(inj.get).to.be.a('function')
      expect(inj.getSync).to.be.a('function')
      expect(inj.getLazy).to.be.a('function')
      expect(inj.getLazySync).to.be.a('function')
      expect(inj.add).to.be.a('function')
      expect(inj.has).to.be.a('function')
      expect(inj.parent).to.be.instanceof(di.Injector)
      expect(inj.providers).to.be.instanceof(Map)
      expect(inj.providers.size).to.equal(1)
    })

    describe('injector.getSync(fn)', () => {
      it('should throw if no provider is found for a given token', () => {
        // expect(this.injector.get(Math.random()))
      })

      it('should return the function\'s actual return value syncronusly', () => {
        let inj = this.injector
        expect(inj.getSync(this.fn1)).to.equal('A')
        expect(inj.getSync(this.fn2)).to.equal('A-B')
        console.log(inj)
      })
    })
  })
})

/*

annotate(fn, new di.InjectLazy('depA', 'depB', 'depC'))
function fn (depA, depB, depC) {
  console.log(...arguments)
  return [...arguments]
}

annotate(depA, new di.AddProvider('depA'))
function depA () {
  return 'a'
}

annotate(depB, new di.Provide('depB'))
function depB () {
  return 'b'
}

annotate(depC, new di.Provide('depC'))
function depC () {
  return 'c'
}

console.log('---', di)

let baseInjector = new di.Injector()
export let injector = new di.Injector(di.providers, baseInjector)


injector.get('depA')
console.log(injector)
/*
*/
