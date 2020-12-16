import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/client"

import Navigation from '../components/navigation/Navigation';
import AllMovies from '../components/hub/AllMovies';

const Movies = (props) => {
   const [session, loading] = useSession();
   const router = useRouter();

   return (
   <div>
      <Navigation/>
      {!session ?
      (
         <>
         <p>You need to be logged in to view this content</p>
         </>
      ):
      (
         <>
         <div className="Hub">
            <AllMovies movies={props.movies}/>
         </div>
         </>
      )
      }
      
   </div>
   );
}

Movies.getInitialProps = async () => {
   const res = await fetch('http://localhost:3000/api/movies');
   const { data } = await res.json();

   return { movies: data }
}
 
export default Movies;
