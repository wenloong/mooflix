import Navigation from '../../../components/navigation/Navigation';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const EditMovie = (props) => {
   const [title, setTitle] = useState({ title: props.movie.title });
   const [description, setDescription] = useState({ description: props.movie.description });
   const [release_date, setRDate] = useState({ release_date: props.movie.release_date });
   const [duration, setDuration] = useState({ duration: props.movie.duration });
   const [studio, setStudio] = useState({ studio: props.movie.studio });

   const genre = [];
   const [actionChecked, setActionChecked] = useState(false);
   const [comedyChecked, setComedyChecked] = useState(false);
   const [dramaChecked, setDramaChecked] = useState(false);
   const [fantasyChecked, setFantasyChecked] = useState(false);
   const [horrorChecked, setHorrorChecked] = useState(false);
   const [mysteryChecked, setMysteryChecked] = useState(false);
   const [romanceChecked, setRomanceChecked] = useState(false);
   const [thrillerChecked, setThrillerChecked] = useState(false);
   const [westernChecked, setWesternChecked] = useState(false);

   const router = useRouter();

   const updateMovie = async (e) => {
      e.preventDefault();

      try {
         const body={ title, description, release_date, duration, studio };
         const res = await fetch(`http://localhost:3000/api/movies/${router.query.mvid}`, {
            method: 'PUT',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         })

         console.log(res);
         router.push("/");
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      setTitle(props.movie.title);
      setDescription(props.movie.description);
      setRDate(props.movie.release_date);
      setDuration(props.movie.duration);
      setStudio(props.movie.studio);
   }, [props.movie])

   return (
      <div>
         <Navigation />
         <form className="Form__newmovie" onSubmit={updateMovie}>
            <div>
               <label>Title</label>
               <input placeholder="ex: Avengers" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
               <label>Description</label>
               <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
               <label>Release Date</label>
               <input placeholder="11-09-2020" value={release_date} onChange={e => setRDate(e.target.value)} />
            </div>
            <div>
               <label>Duration</label>
               <input placeholder="6000" value={duration} onChange={e => setDuration(e.target.value)} />
            </div>
            <div>
               <label>Studio</label>
               <input placeholder="Disney" value={studio} onChange={e => setStudio(e.target.value)} />
            </div>
            <div>
               <label>Genre</label>
               <div>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={actionChecked} onChange={() => setActionChecked(!actionChecked)} />
                  Action
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={comedyChecked} onChange={() => setComedyChecked(!comedyChecked)} />
                  Comedy
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={dramaChecked} onChange={() => setDramaChecked(!dramaChecked)} />
                  Drama
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={fantasyChecked} onChange={() => setFantasyChecked(!fantasyChecked)} />
                  Fantasy
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={horrorChecked} onChange={() => setHorrorChecked(!horrorChecked)} />
                  Horror
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={mysteryChecked} onChange={() => setMysteryChecked(!mysteryChecked)} />
                  Mystery
               </label >
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={romanceChecked} onChange={() => setRomanceChecked(!romanceChecked)} />
                  Romance
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={thrillerChecked} onChange={() => setThrillerChecked(!thrillerChecked)} />
                  Thriller
               </label>
                  <label className="checkbox__label">
                     <input className="checkbox" type="checkbox" checked={westernChecked} onChange={() => setWesternChecked(!westernChecked)} />
                  Western
               </label>
               </div>
            </div>
            <button type="submit">Update</button>
         </form>
      </div>
   )
}

EditMovie.getInitialProps = async ({ query: { mvid } }) => {
   const res = await fetch(`http://localhost:3000/api/movies/${mvid}`);
   const { data } = await res.json();

   return { movie: data }
}

export default EditMovie;