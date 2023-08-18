import { cloneDeep } from 'lodash-es'

type GlobalState = Record<string, any>
type OnStateChangeCallback = (state:GlobalState, prevState:GlobalState) => void

let globalState:GlobalState = {}
let deps:Record<string, OnStateChangeCallback> = {}

function emitGlobal(state:GlobalState, prevState:GlobalState) {
  Object.keys(deps).forEach(function (id) {
    if (typeof deps[id] !== 'function') return
    deps[id](cloneDeep(state), cloneDeep(prevState))
  })
}

export function initGlobalState(state:GlobalState) {
  const prevGlobalState = cloneDeep(globalState)

  globalState = cloneDeep(state)
  emitGlobal(globalState, prevGlobalState)
  const id = `single-spa-${Date.now()}`

  return {
    onGlobalStateChange: function onGlobalStateChange(callback:OnStateChangeCallback) {
      deps[id] = callback
    },
    setGlobalState: function setGlobalState(state:GlobalState) {
      if (state === globalState) return false
      var changeKeys = []
      var prevGlobalState = cloneDeep(globalState)

      globalState = cloneDeep(Object.keys(state).reduce(function (_globalState, changeKey) {
        if (state[changeKey] !== globalState[changeKey]) {
          changeKeys.push(changeKey)
        }
        return {
          ..._globalState,
          [changeKey]: state[changeKey],
        }
      }, globalState))

      if (!changeKeys.length) return false

      emitGlobal(globalState, prevGlobalState)
      return true
    },
  }
}