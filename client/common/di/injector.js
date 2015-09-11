/* @flow */

import {
  Provide,
  Inject,
  InjectLazy,
  getAnnotations,
} from './annotations'

type Token = string | Object | Function

export default class Injector {
  parent: Injector;
  providers: Map;

  constructor (providers = [], parentInjector: Injector) {
    this.parent = parentInjector
    this.providers = new Map

    if (providers instanceof Map) {
      for (let [token, provider] of providers) {
        this.set(token, provider)
      }
    }

    if (Array.isArray(providers)) {
      providers.forEach(provider => {
        getAnnotations(provider, Provide).forEach(anno => {
          this.set(anno.provide, provider)
        })
      })
    }
  }

  set (token: Token, provider: Function, isLazy: boolean = false) {
    this.providers.set(token, {
      provider: provider,
      lazy: isLazy,
    })
  }

  get (token: Token) {}

  getSync (token: Token): any {
    if (this.has(token)) {
      return this.getSync(this.providers.get(token).provider)
    }

    if (token instanceof Function) {
      let [ toInject ] = getAnnotations(token, Inject)

      if (!toInject) { return token() }

      let isLazy = toInject.lazy
      let errMsg = isCyclicInjection(token, toInject.tokens, this.providers)

      if (errMsg) {
        throw new Error(errMsg)
      }

      toInject = toInject.tokens.map(token => {
        if (this.has(token)) {
          return this.getSync(token)
        }

        return new ProviderNotFound(token)
      })

      return token(...toInject)
    }

    throw new Error(`hasn't found a provider for "${token}"`)
  }

  getLazy (token: Token) {}
  getLazySync (token: Token) {}

  has (token: Token): boolean {
    if ((this.providers instanceof Map) && this.providers.has(token)) {
      return true
    }

    if (this.parent && (this.parent.has instanceof Function)) {
      return this.parent.has(token)
    }

    return false
  }

  add (...providers: Array<Function>) {}
}

class ProviderNotFound {
  token: Token;
  constructor (token: Token) {
    this.token = token
    Object.freeze(this)
  }
}

class CacheNotFound {
  token: Token;
  constructor (token: Token) {
    this.token = token
    Object.freeze(this)
  }
}

export function isCyclicInjection (token: Token, deps: Array<Token>, providers: Map, errStack: Array<Token> = [], visited: Array<Token> = []) {

  if (errStack.includes(token)) { return }
  if (visited.includes(token)) { return }

  if (deps.includes(token)) {
    // avoiding adding twice the token into the errStack
    !errStack.includes(token) && errStack.push(token)
    return formatErrMsg(token, deps, errStack)
  }

  let isCyclic
  deps.forEach(dep => {

    if (isCyclic) { return }
    if (dep === token) { return }
    if (errStack.includes(token)) { return }

    // catching unregistered action handlers.
    if (!providers.has(dep)) {
      errStack.push(dep)
      return
    }

    // skipping already analized dep
    if (visited.includes(dep)) { return }
    visited.push(dep)

    //
    //
    // need to implement stuff here
    //
    //

    // by now all the dependecy tree have been walked.

    // checking if an unregistered action handler is one among the errStack
    // and returning the appropriate error message.
    for (let dep of errStack) {
      if (!providers.has(dep)) {
        return formatErrMsg(token, deps, errStack)
      }
    }

    // the the errStack includes the token, it implies
    // a cyclic action token has being found.
    if (errStack.includes(token)) {
      return formatErrMsg(token, deps, errStack)
    }

    // by now, no problem hasn't being found.
    // Returning undefined.


  })

}

export function formatErrMsg (token: Token, deps: Array<Token>, errStack: Array<Token>): string {
  return 'place holder'
}

//
// function isCyclicInjectionOriginal (handler, deps, meta, errStack = [], visited = []) {
//   // returning early if nothing todo
//   console.log('checking is cyclic')
//   return
//
//   if (errStack.includes(handler)) { return }
//   if (visited.includes(handler)) { return }
//
//   if (deps.includes(handler)) {
//     // avoiding adding twice the handler into the errStack
//     !errStack.includes(handler) && errStack.push(handler)
//     return formatErrMsgOriginal(handler, errStack, meta)
//   }
//
//   var isCyclic
//   deps.forEach((dep) => {
//     if (isCyclic) { return }
//     if (dep === handler) { return }
//     if (errStack.includes(handler)) { return }
//
//     // catching unregistered action handlers.
//     if (!meta.handlers.includes(dep)) {
//       errStack.push(dep)
//       return
//     }
//
//     // skipping already analized dep
//     if (visited.includes(dep)) { return }
//     visited.push(dep)
//
//     // nothing todo if no/empty cache of dependecies
//     var depCache = meta.waitForCache.get(dep)
//     if (!depCache || depCache.length === 0) { return }
//
//     // just assuming this is a cyclic action handler
//     // this is need to keep the order of the dependecies
//     if (!errStack.includes(dep)) { errStack.push(dep) }
//
//     // looping over the dependecy tree of a particular dependecy
//     depCache.forEach((deps) => {
//       // checking if the handler is among the new dependecies.
//       // and avoiding appending twice
//       if (deps.includes(handler) && !errStack.includes(dep)) {
//         errStack.push(dep)
//       }
//
//       // let the next iteration detect if the handler indeed is cyclic.
//       isCyclic = isCyclicInjection(handler, deps, meta, errStack, visited)
//     })
//
//     // removing the previous assumed cyclic action handler
//     if (!isCyclic) { errStack.pop()}
//   })
//
//   // by now all the dependecy tree have been walked.
//
//   // checking if an unregistered action handler is one among the errStack
//   // and returning the appropriate error message.
//   for (let dep of errStack) {
//     if (!meta.handlers.includes(dep)) {
//       return formatErrMsgOriginal(handler, errStack, meta, false)
//     }
//   }
//
//   // the the errStack includes the handler, it implies
//   // a cyclic action handler has being found.
//   if (errStack.includes(handler)) {
//     return formatErrMsgOriginal(handler, errStack, meta)
//   }
//
//   // by now, no problem hasn't being found.
//   // Returning undefined.
// }
//
//
// function formatErrMsgOriginal (handler, errStack, meta, cyclic = true) {
//   // There are two kinds of errors.
//   // A) unknown action handlers
//   // B) cyclic handler dependency
//
//   // just assuming it's the unknown kind of error.
//   var title = 'unknown action handler:\n    '
//
//   // creating an identification for the handler.
//   var handlerId = handler.name ? handler.name : meta.getIndexOf(handler)
//   handlerId = `[[ ${handlerId || ''} ]]`
//
//   // if there is a unregistered handler, trunked it.
//   var foundUnregistered
//   errStack = errStack
//     .filter((dep) => {
//       if (foundUnregistered) { return false }
//
//       if (!meta.handlers.includes(dep)) {
//         foundUnregistered = true
//       }
//
//       return true
//     })
//     .map(dep => {
//       // creating an identification for the handler's dependencies.
//       var depId = dep.name ? dep.name : meta.getIndexOf(dep)
//       return `( ${depId === -1 ? Object.prototype.toString.call(dep) : depId} )`
//     })
//
//   errStack.unshift(handlerId)
//
//   if (cyclic) {
//     // fixing the error message for cyclic kind of error
//     errStack.pop()
//     errStack.push(handlerId)
//     title = 'cyclic action handler:\n    '
//   }
//
//   return title + `${errStack.join(' -> ')}` +'\n'
// }
//

export function guid (): string {
  var d = new Date().getTime()

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (d + Math.random()*16)%16 |0
    d = Math.floor(d/16)
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16)
  })
}
