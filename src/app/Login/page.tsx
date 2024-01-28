 'use client'
 import { useState } from "react";
 import { supabase } from "@/lib/supabase";
 import { useRouter } from "next/navigation";

 export default function Login() {
   const [data, setData] = useState<{
    email:string,
     password:string
   }>({
     email:'',
     password:''
   })
   const [success, setSuccess] = useState<boolean>(false)
    const [resestPassword, setResestPassword] = useState<boolean>(false)

  const router = useRouter()
     const login = async () => {
       try {
         let { data: dataUser, error } = await supabase
         .auth
         .signInWithPassword({
           email:  data.email,// 'someone@email.com',
         password: data.password// 'mZZLIbbjwhFCrGQEjDvv'
         });
         
         console.log(data)
         
        if(dataUser){
            // const {user} = dataUser
            // if(user){
            //     setSuccess(true)
            // }
          router.refresh()
        }
  
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const sendResetPassword = async () => {
try{
    const {data : resetData, error} =await supabase
    .auth
    .resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.href}reset`
    })
    setSuccess(true)

}
catch(error){
  console.log(error)
}
    }

    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setData((prev: any) => ({
        ...prev,
        [name]: value
      }));
    };
    
    return (
      <div>
       {!resestPassword && <div> <div>
            <label htmlFor="">Email</label>
            <input type="text"
            name="email"
            value={data?.email}
            onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="">Password</label>
            <input type="password"
            name="password"
            value={data?.password}
            onChange={handleChange} />
        </div> </div> }
        <div><button className="bg-green-400" onClick={login}>sign In</button></div>
    
    {resestPassword && <div className="grid gap-4">
        <div>
            <label htmlFor="">Email</label>
            <input type="text"
            name="email"
            value={data?.email}
            onChange={handleChange} />
        </div>
<div className="bg-green-100 text-green-700">Success! Check your email</div>
     <div>
    <button className="bg-green-400" onClick={sendResetPassword}>
            Reset Password</button></div>
     </div>}
    <p onClick={() => setResestPassword(!resestPassword)} className="cursor-pointer hover:underline">
        {resestPassword ? 'Login' : 'Reset my Password' }</p> 
   
      </div>
   );
  }
  