/* @flow */
import di from './di/index'

export { di }

let { annotate } = di


// console.log('*******')

annotate(fn, new di.Inject('depA', 'depB', 'depC'))
function fn (depA, depB, depC): Array<any> {
  console.log(...arguments)
  return [depA, depB, depC]
}

annotate(depA, new di.AddProvider('depA'))
function depA (): string {
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

console.log('--dsdsds-', di)

let baseInjector = new di.Injector()
export let injector = new di.Injector(di.providers, baseInjector)


injector.get('depA')
console.log(injector, 'DDD',  injector.get('depA'))

