import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/client"

import Navigation from '../components/navigation/Navigation';
import Featured from '../components/hub/Featured';
import Collection from '../components/hub/Collection';
import Action from '../components/hub/Action';

const Index = (props) => {
   const [session, loading] = useSession();

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
            <Featured/>
            {/* <video controls>
               {console.log(hdfs)}
               <source src="http://192.168.1.4:9864/webhdfs/v1/movies/Doctor_Strange.mp4?op=OPEN&namenoderpcaddress=localhost:9000&offset=0" type="video/mp4"></source>
            </video> */}
            {/* <Link href="/movie/Doctor_Strange">
               <p>Doctor Strange</p>
            </Link> */}
            <Collection group="ACTION" movies={props.actionData} user={session.user.name}/>
            <Collection group="HORROR" movies={props.horrorData}/>
            <Collection group="FANTASY" movies={props.fantasyData}/>
            
         </div>
         </>
      )
      }
      
   </div>
   );
}

export async function getStaticProps() {
   const res = await fetch('http://localhost:3000/api/movies/');
   const { data } = await res.json();

   const resAction = await fetch(`http://localhost:3000/api/movies/genre/Action`);
   const { actionData } = await resAction.json();

   const resHorror = await fetch(`http://localhost:3000/api/movies/genre/Horror`);
   const { horrorData } = await resHorror.json();

   const resFantasy = await fetch(`http://localhost:3000/api/movies/genre/Fantasy`);
   const { fantasyData } = await resFantasy.json();

   return { props: { data, actionData, horrorData, fantasyData }}
}
 
export default Index;



// getMovie = async (mvid) => {
//    let host = "http://192.168.1.4:";
//    let port = "9864";
//    let path = "/webhdfs/v1";
//    let dir_path = "/movies/";
//    let suffix = "?op=OPEN&namenoderpcaddress=localhost:9000&offset=0";

//    let full_url = host + port + path + dir_path + mvid + suffix;
// }