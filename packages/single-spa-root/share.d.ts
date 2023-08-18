interface SingleSpaLifeCycle {
  bootstrap: () => Promise<any>
  mount: () => Promise<any>
  unmount: () => Promise<any>
}

declare global {
  interface Window {
    'single-spa-app1': SingleSpaLifeCycle
    'single-spa-app2': SingleSpaLifeCycle
  }
}

export {}