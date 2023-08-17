import React from 'react'
import ReactDOM from 'react-dom/client'
import { Message } from '@arco-design/web-react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export const bootstrap = ()  => {
  Message.info('app1 bootstrap')
  return Promise.resolve()
}

export const mount = (props:any) => {
  Message.info('app1 应用开始渲染')
  console.log(props)

  // ReactDOM.createRoot(document.getElementById('root')!).render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>,
  // )

  Message.success('app1 应用结束渲染')
}

export const unmount = () => {
  Message.warning('app1 应用卸载')
}

export default {
  bootstrap,
  mount,
  unmount,
}
