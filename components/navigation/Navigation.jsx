import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/client"
import { useState } from 'react';

const Navigation = () => {
   const [session] = useSession();
   const [showSettings, setShowSettings] = useState(false);

   const settingsClick = () => {
      if (showSettings) setShowSettings(false)
      else setShowSettings(true)
   }

   return (
      <div className="Navigation">
         <nav>
            <div>
               <div className="Navigation__logo">
                  <img src="/logo.svg"/>
                  <p>Mooflix</p>
               </div>
               <div className="Navigation__links">
                  <Link href="/">Home</Link>
                  <Link href="/movies">Movies</Link>
                  <Link href="/search">Search</Link>
               </div>
            </div>

            <div>
               <div className="Navigation__profile">
                  {
                     !session?
                     (
                        <>
                           <button className="Navigation__button" onClick={signIn}>Sign In</button>
                        </>
                     ):
                     (
                        <>
                           <p onClick={settingsClick}>{session.user.name}</p>
                           <img src={session.user.image}/>
                           { showSettings ? <Settings/> : null }
                        </>
                     )
                  }
               </div>
            </div>
         </nav>
      </div>
   )
}

const Settings = () => (
   <div className="Settings">
      <ul>
         <li>Genre Preference</li>
         <li onClick={signOut}>Sign Out</li>
      </ul>
   </div>
)

export default Navigation;