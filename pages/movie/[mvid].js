import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/client';

const Movie = ({movie}) => {
   const [comment, setComment] = useState([]);
   const [session, loading] = useSession();
   const router = useRouter();

   var username, userImage, userAccessToken, uid;
   var mvid = movie._id;
   //const url = `http://192.168.1.4:9870/webhdfs/v1/movies/${mvid}.mp4?op=OPEN&namenoderpcaddress=localhost:9000`;
   
   if (session) {
      username = session.user.name;
      userImage = session.user.image;
      userAccessToken = session.accessToken;
   }

   getUserId(userAccessToken);

   async function getUserId(token) {
      try {
         const res = await fetch(`http://localhost:3000/api/sessions/${token}`);
         const currentUser = await res.json();

         uid = currentUser.data[0]?.userId;
      } catch (error) {
         console.error(error);
      }
   }

   const handleSubmit = async e => {
      e.preventDefault();
      
      try {
         const body = { comment, username, userImage, mvid };
         const res = await fetch(`http://localhost:3000/api/movies/createComment`, {
            method: 'PUT',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         });
         
         router.push(`/movie/${movie._id}`);
         setComment("");
      } catch (error) {
         console.log(error);
      } 
   }

   const handleLike = async e => {
      e.preventDefault();

      try {
         const body = { mvid, uid };
         const res = await fetch(`http://localhost:3000/api/movies/like`, {
            method: 'PUT',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         });

         router.push(`/movie/${movie._id}`);
      } catch (error) {
         console.error(error);
      }
   }

   const handleDislike = async e => {
      e.preventDefault();

      try {
         const body = { mvid, uid };
         const res = await fetch(`http://localhost:3000/api/movies/dislike`, {
            method: 'PUT',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         });

         router.push(`/movie/${movie._id}`);
      } catch (error) {
         console.error(error);
      }
   }
   // Need to disable like & dislike button after each click for a few sec to sending data too fast
   // to mongodb

   return (
      <div>
         <p>{username}</p>
         <p>{uid}</p>
         {/* <video src={url} controls/> */}
         <h3>{movie.title}</h3>
         <p>{movie.description}</p>
         <p>{movie.genre}</p>
         <p>{movie.likeCount}</p>
         <p>{movie.dislikeCount}</p>
         <button type="button" onClick={handleLike}>Like</button>
         <button type="button" onClick={handleDislike}>Dislike</button>

         <h4>Comment Section</h4>
         {movie.comments.map((commentData) => (
            <div key={commentData._id}>
               <p>{commentData.comment}</p>
               <p>{commentData.username}</p>
               <img src={commentData.userImage}/>
            </div>
         ))}
         <form onSubmit={handleSubmit}>
            <label>New Comment</label>
            <textarea value={ comment } onChange={ e => setComment(e.target.value) }></textarea>
            <button type="submit">Send</button>
         </form>

         {/* {console.log(movie.comments[0].comment)} */}
      </div>
   )
}

Movie.getInitialProps = async ({ query: { mvid } }) => {
   const movieRes = await fetch(`http://localhost:3000/api/movies/${mvid}`);
   const { data } = await movieRes.json();

   return { movie: data }
}

export default Movie;


 