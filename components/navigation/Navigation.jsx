import Link from 'next/link';

const Navigation = () => (
   <div className="Navigation">
      <nav>
         <div>
            <div className="Navigation__logo">
               <img src="/logo.svg"/>
               <p>Mooflix</p>
            </div>
            <div className="Navigation__links">
               <Link href="#">Home</Link>
               <Link href="#">Movies</Link>
               <Link href="#">Search</Link>
            </div>
         </div>

         <div>
            <div className="Navigation__profile">
               <p>My Profile</p>
               <img src="/profile.jpg"/>
            </div>
         </div>
      </nav>
   </div>
)

export default Navigation;