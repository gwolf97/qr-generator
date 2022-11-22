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



  return (
    <main style={{justifyContent:"center", alignItems:"center", display:"flex", width:"100%", flexDirection:"column"}}>
      <div style={{width:"100%", height:"100px", background:"#ffcccc", display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:"10px", color:"#fff"}}>
          <h1>QR GENERATOR</h1>
      </div>
      <div className='wrapper'>
        <input className='input' style={{padding:"20px 140px 20px 30px" , width:"25rem", borderRadius:"30px", border:"none", background:"#ffffff", marginTop:"150px", fontFamily:"sans-serif", fontSize:"16px"}} placeholder='Enter a valid URL' onChange={e => handleChange(e)} />
        <button className='btn' onClick={() => handleSubmit()} style={{margin:"-50px 0 0 17.2rem", borderRadius:"30px", padding:"15px 20px", border:"none", fontFamily:"sans-serif", fontSize:"12px", fontWeight:"600" , background:"#ff7b73", color:"#fff"}} >Generate QR</button>
        <p style={{height:"50px", marginTop:"30px", color:"#fff"}}>{ show && errorMessage}</p>
      </div>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%"}}>
        {qrArray.length > 0 && (
          <p style={{fontFamily:"sans-serif", fontSize:"12px", fontFamily:"sans-serif", color:"#fff"}}>
              Left click & "save image as" to download your QR.
          </p>
        )}
        {qrArray.map((code, index) => (
          <div key={`${code.Url}${index + 1}`} style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", width:"100%", margin:"50px 0"}}>
            <img style={{width:"200px"}} src={code.dataUrl} alt="qr code"/>
            <p style={{fontFamily:"sans-serif", fontSize:"16px", fontWeight:"600", marginTop:"20px"}}>{code.Url}</p>
          </div>
        ))}
      </div>
    </main>
  )
}


export default App
