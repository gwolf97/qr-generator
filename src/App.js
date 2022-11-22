import ReactDOM from 'react-dom'
import React from 'react'
import { QRCode } from 'react-qrcode'
import { useQRCode } from 'react-qrcode'


// hooks

function App () {
  const [value, setValue] = React.useState('https://www.1stg.me')
  const dataUrl = useQRCode(value)
  return (
    <>
      <img src={dataUrl} />
      <input onChange={e => setValue(e.currentTarget.value)} />
    </>
  )
}


export default App
