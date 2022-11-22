import React, {useState} from 'react'
import { useQRCode } from 'react-qrcode'
import validator from 'validator'

function App () {
  const [value, setValue] = useState('https://www.1stg.me')
  const [errorMessage, setErrorMessage] = useState('')
  const [show, setShow] = useState(false)
  const [qrArray, setQrArray] = useState([])

  const dataUrl = useQRCode(value)

  const handleChange = (e) => {

    setShow(false)
    setValue(e.currentTarget.value)

    if (validator.isURL(e.target.value)) {
      setErrorMessage('Is Valid URL')
      setShow(true)
    } else {
      setErrorMessage('Is Not Valid URL')
    }
  }

  const handleSubmit = () => {
      if(value === "" | errorMessage === "Is Not Valid URL"){
        setShow(true)
      }else{
        setQrArray(prev => [{Url:value, dataUrl:dataUrl }, ...prev] )
      }
  }

  console.log(dataUrl)


  return (
    <>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%", margin:"100px 0"}}>
        <input placeholder='Enter a valid URL' onChange={e => handleChange(e)} />
        <button onClick={() => handleSubmit()} >Generate QR</button>
        <p style={{height:"50px"}}>{ show && errorMessage}</p>
      </div>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%"}}>
        {qrArray.map((code, index) => (
          <div key={`${code.Url}${index + 1}`} style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width:"100%", marginTop:"50px"}}>
            <img style={{width:"200px"}} src={code.dataUrl} alt="qr code"/>
            <p>{code.Url}</p>
          </div>
        ))}
      </div>


      
    </>
  )
}


export default App
