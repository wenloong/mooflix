import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/client';
import Navigation from '../../../components/navigation/Navigation'

const Movie = ({movie}) => {
   const [comment, setComment] = useState([]);
   const [session, loading] = useSession();
   const router = useRouter();

   var username, userImage, userAccessToken, uid;
   var mvid = movie._id;
   const url = `http://192.168.1.7:9870/webhdfs/v1/movies/${movie.title}.mp4?op=OPEN&namenoderpcaddress=localhost:9000`;
   
   if (session) {
      username = session.user.name;
      userImage = session.user.image;
      userAccessToken = session.accessToken;
   }

   getUserId(userAccessToken);
   updateViews(mvid);
   
   async function getUserId(token) {
      try {
         const res = await fetch(`http://localhost:3000/api/sessions/${token}`);
         const currentUser = await res.json();

         uid = currentUser.data[0]?.userId;
      } catch (error) {
         console.error(error);
      }
   }

   async function updateViews(mvid) {
      try {
         const body = { mvid };
         const res = await fetch(`http://localhost:3000/api/movies/views`, {
            method: 'PUT',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         });

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

   const handleDelete = async e => {
      e.preventDefault();

      try {
         const body = { mvid };
         const res = await fetch(`http://localhost:3000/api/movies/${mvid}`, {
            method: 'DELETE',
         });

         router.push(`/movies`);
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <div>
         <Navigation/>
         <div className="Hub">
            <video src={url} controls/>
            <div className="Showtime">
               <div className="Showtime__title">
                  <h3>{movie.title}</h3>
               </div>
               <div className="Showtime__desc">
                  <p>{movie.description}</p>
               </div>
               <div className="Showtime__genre">
                  <h3>Genre: </h3>
                  {movie.genre.map((genreData) => (
                     <div className="Showtime__genre--item">
                        <p>{genreData}</p>
                     </div>
                  ))}
               </div>
               <div className="Showtime__stats">
                  <div className="Showtime__stats--like">
                     <img onClick={handleLike} className="MovieCard__icon" src="/like.svg"/>
                     <p>{movie.likeCount}</p>
                  </div>
                  <div className="Showtime__stats--dislike">
                     <img onClick={handleDislike} className="MovieCard__icon" src="/dislike.svg"/>
                     <p>{movie.dislikeCount}</p>
                  </div>
               </div>
               
               <div className="Showtime__delete">
                  <button onClick={handleDelete}>Delete Movie</button>
               </div>
            </div>

            <div className="Form">
               <div className="Form__comment">
               <form onSubmit={handleSubmit}>
                  <label>New Comment</label>
                  <textarea value={ comment } onChange={ e => setComment(e.target.value) }></textarea>
                  <button type="submit">Send</button>
               </form>
               </div>
            </div>

            <div className="Comment">
               <div className="Comment__title">
                  <h3>Comment Section</h3>
               </div>
               <div className="Comment__comments">
                  {movie.comments.map((commentData) => (
                     <div key={commentData._id}>
                        <div className="Comments__wrapper">
                           <img src={commentData.userImage}/>
                           <div>
                              <p>{commentData.username}</p>
                              <p>{commentData.comment}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

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


 