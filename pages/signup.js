import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter();

   const handleSignUp = async e => {
      e.preventDefault();

      try {
         const body = { username, email, password };
         const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         });
         
         router.push("/");
      } catch (error) {
         console.log(error);
      } 
   }

   return (
      <div className="SignUp">
         <form className="form" onSubmit={handleSignUp}>
            <label>Username: </label>
            <input name="username" type="text" value={ username } onChange={e => setUsername(e.target.value)} required/>
            <label>Email Addresss: </label>
            <input name="email" type="text" value={ email } onChange={e => setEmail(e.target.value)} required/>
            <label>Password: </label>
            <input name="password" type="password" value={ password } onChange={e => setPassword(e.target.value)} required/>

            <button type="submit">Submit</button>
         </form>
      </div>
   )
}

export default SignUp;