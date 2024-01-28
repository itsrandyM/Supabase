'use client'
import { useState } from "react";
import'../globals.css'
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [data, setData] = useState<{
    password:string,
    confirmPassword:string
  }>({
    password:'',
    confirmPassword:''
  })

  const [showPassword, setShowPassword] = useState<boolean>(false)
 const router  = useRouter()

   const handleChange = (e: any) => {
     const { name, value } = e.target;
     setData((prev: any) => ({
       ...prev,
       [name]: value
     }));
   };
   
   const confirmPasswords = async() => {
    const {password, confirmPassword} = data
    if (password !== confirmPassword) return alert(`Passwords don't match`)
  
    const {data: resetData, error} = await supabase 
    .auth
    .updateUser({
      password: data.password
    })
    if(resetData){
      router.push('/')
    }
  }

  

   return (
    <div>
        <div>
           <label htmlFor="">Enter new password</label>
           <input type={showPassword ? 'text' :'password'}
           name="password"
           value={data?.password}
           onChange={handleChange} />
       <div>
           <label htmlFor="">Confirm Password</label>
           <input type={showPassword ? 'text' :'password'}
           name="confirmPassword"
           value={data?.confirmPassword}
           onChange={handleChange} />
       </div>  
       <div onClick={() => setShowPassword(!showPassword)}>
        Show Password
       </div>
       <div><button className="bg-green-400" onClick={confirmPasswords}>
        Confirm
        </button></div>
       </div>
 
  
     </div>
  );
 }
 