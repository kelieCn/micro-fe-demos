import React from 'react'
import ReactDOM from 'react-dom/client'
import { Message } from '@arco-design/web-react'
import App from './App.tsx'
import './index.css'

export const bootstrap = ()  => {
  Message.info('app1 bootstrap')
  return Promise.resolve()
}

export const mount = (props:any) => {
  Message.info('app1 应用开始渲染')
  const { name } = props

  ReactDOM.createRoot(document.querySelector(`#${name}`)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  Message.success('app1 应用结束渲染')
  return Promise.resolve()
}

export const unmount = () => {
  Message.warning('app1 应用卸载')
  return Promise.resolve()
}
