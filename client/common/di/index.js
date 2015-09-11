/* @flow */
import Injector from './injector'
import * as annotations from './annotations'

export * from './annotations'
export { Injector }

let di = Object.assign({}, annotations, { Injector })
export default di
