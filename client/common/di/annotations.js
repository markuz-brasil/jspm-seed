/* @flow */
export let providers = []
export let annotations = new Map

class Handlers extends Map {
  constructor (...args) {
    super(...args)
  }

  set (target, handler) {
    if (!super.has(target)) {
      super.set(target, [])
    }

    super.get(target).push(handler)
  }
}

export let handlers = new Handlers


export function annotate (target, anno) {
  if (!annotations.has(target)) {
    annotations.set(target, [])
  }

  annotations.get(target).push(anno)

  if (anno.constructor instanceof Function) {
    for (let [Ctor, list] of handlers) {
      if (handlers.has(Ctor) && (Ctor === anno.constructor)) {
        list.forEach(handler => handler(target, anno))
      }
    }
  }
}

export function getAnnotations (target, Ctor) {
  return annotations.get(target).filter(anno => anno instanceof Ctor)
}

export class Inject {
  constructor (...tokens) {
    this.tokens = tokens
    this.lazy = false
  }
}

handlers.set(Inject, (target, anno) => {
  let toInject = []

  getAnnotations(target, Inject).forEach(anno => {
    anno.tokens.forEach(token => {
      toInject.push(token)
    })
  })

  let newAnno = annotations.get(target).filter(anno => !(anno instanceof Inject))
  newAnno.push(new Inject(...toInject))

  annotations.set(target, newAnno)
})

export class InjectLazy extends Inject {
  constructor (...tokens) {
    super(...tokens)
    this.lazy = true
  }
}

export class Provide {
  constructor (token) {
    this.provide = token
  }
}

export class AddProvider extends Provide {
  constructor (token) {
    super(token)
  }
}

handlers.set(AddProvider, (target, anno) => {
  providers.push(target)
})

export class Sync {}

