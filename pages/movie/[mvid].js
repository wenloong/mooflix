import { useRouter } from 'next/router';

const Movie = () => {
   const router = useRouter();
   const { mvid } = router.query;
   const url = `http://192.168.1.4:9870/webhdfs/v1/movies/${mvid}.mp4?op=OPEN&namenoderpcaddress=localhost:9000`;
   
   return (
      <div>
         <video src={url} controls/>
      </div>
   )
}

export default Movie;
