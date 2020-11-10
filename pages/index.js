import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import Navigation from '../components/navigation/Navigation';
import Featured from '../components/hub/Featured';
import Collection from '../components/hub/Collection';


import SignUp from './signup';

// getMovie = async (mvid) => {
//    let host = "http://192.168.1.4:";
//    let port = "9864";
//    let path = "/webhdfs/v1";
//    let dir_path = "/movies/";
//    let suffix = "?op=OPEN&namenoderpcaddress=localhost:9000&offset=0";

//    let full_url = host + port + path + dir_path + mvid + suffix;

   
// }

const Index = (props) => {
   const router = useRouter();

   return (
   <div>
      <Navigation/>
      <div className="Hub">
         <Featured/>
         {/* <Collection movies={props.movies}/> */}
         {/* <video controls>
            {console.log(hdfs)}
            <source src="http://192.168.1.4:9864/webhdfs/v1/movies/Doctor_Strange.mp4?op=OPEN&namenoderpcaddress=localhost:9000&offset=0" type="video/mp4"></source>
         </video> */}
         <Link href="/movie/Doctor_Strange">
            <p>Doctor Strange</p>
         </Link>


         <button onClick={() => {
            var formData = new FormData();
            var filePath = 'C:/Users/wenlo/Documents/Development/Web\ Development/mooflix/public/movies/Avengers.mp4';
            console.log(filePath);
            axios.post(`http://192.168.1.4:9870/webhdfs/v1/movies/Avengers.mp4?op=APPEND&namenoderpcaddress=localhost:9000`, {
               filePath
            })
            .then(res => {
               console.log(res);
            })
            .catch(error => {
               console.error(error);
            })
         }}>
         </button>
      </div>
   </div>
   );
}

Index.getInitialProps = async () => {
   const res = await fetch('http://localhost:3000/api/movies');
   const { data } = await res.json(); 

   return { movies: data }
}
 
export default Index;
