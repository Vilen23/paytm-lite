import { useState } from "react"
import { BottomWarn } from "../components/BottomWarn"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export function  Signup(){

const [firstname, setFirstname]= useState("")
const [lastname, setLastname]=useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [popup, setPopup] = useState("")
const [isOpen, setIsopen] = useState(false)

const navigate = useNavigate()

return <div className="bg-slate-300 h-screen flex justify-center">
  <div className="flex flex-col justify-center">
  <div className="px-4 bg-white w-80 text-zinc-950 text-center rounded-lg h-max p-2"> 
  <div className={`popup ${isOpen ? 'active' : 'hide'} ${popup.includes('feilds') || popup.includes('already')||popup.includes('more')?'bg-red-400 p-2 h-16': ''} flex justify-center text-center w-80 shadow-lg bg-green-500 rounded-lg font-medium text-lg fixed top-4 h-11 p-1`}>{popup}</div>
   <Heading text={"Sign up"}></Heading>
   <SubHeading text={"Enter your information to create an account"}></SubHeading>

   

   <InputBox placeholder={"Enter First name"} value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} label={"First name"}></InputBox>
   <InputBox placeholder={"Enter Last name"} value={lastname} onChange={(e)=>{setLastname(e.target.value)}}  label={"Last name"}></InputBox>
   <InputBox placeholder={"Enter Email"} value={username} onChange={(e)=>{setUsername(e.target.value)}}  label={"Email"}></InputBox>
   <InputBox password={true} placeholder={"Password name"} value={password} onChange={(e)=>{setPassword(e.target.value)}}  label={"Password"}></InputBox>
   <Button onclick={async ()=>{
     
     if (firstname==''||lastname==''||password==''||username=='') { 
       console.log('ssssffs');
       setTimeout(() => { 
         setPopup("")
         setIsopen(false)
        }, 3000);
        setIsopen(true)
        setPopup("Please enter all feilds")
      }
      else{
        const res = await axios.post('http://localhost:3000/api/v1/user/signUp',
      {
        firstname, lastname, username, password
       })
       const json = res.data.message
          console.log("inside settimeout");
          setTimeout(() => { 
            setIsopen(false)
            setFirstname("")
            setLastname("")
            setPassword("")
            setUsername("")
            setPopup('')
            navigate('/dashboard')
          }, 3000);
          localStorage.setItem("TOKEN", res.data.token)
          localStorage.setItem('firstname',firstname)
          setIsopen(true)
          setPopup(json)
          console.log(res.data.token);
        }
     
   }} label={"Sign up"}></Button>
   <BottomWarn label={"Already have an account?"} link={"/signin"} linktext={"Sign in"}></BottomWarn>
    </div> 
</div>
  </div>
}