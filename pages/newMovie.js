import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import Navigation from './../components/navigation/Navigation';

const NewMovie = () => {
   const [title, setTitle] = useState([]);
   const [description, setDescription] = useState([]);
   const [release_date, setRDate] = useState([]);
   const [duration, setDuration] = useState([]);
   const [studio, setStudio] = useState([]);

   //Genre
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

   // var genres = [
   //    {id: 1, value: "Action", isChecked: false},
   //    {id: 2, value: "Comedy", isChecked: false},
   //    {id: 3, value: "Drama", isChecked: false},
   //    {id: 4, value: "Fantasy", isChecked: false},
   //    {id: 5, value: "Horror", isChecked: false},
   //    {id: 6, value: "Mystery", isChecked: false},
   //    {id: 7, value: "Romance", isChecked: false},
   //    {id: 8, value: "Thriller", isChecked: false},
   //    {id: 9, value: "Western", isChecked: false}
   // ];

   const [file, setMovieFile] = useState([]);
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const movieFile = { file };

         var localFileStream = fs.createReadStream(file);
         var remoteFileStream = hdfs.createWriteStream('/webhdfs/v1/movies/' + 'Avengers.mp4');
         localFileStream.pipe(remoteFileStream);

         remoteFileStream.on('error', function onError(error) {
            console.error(error)
         });
         remoteFileStream.on('finish', function onFinish() {
            console.log('Upload Success');
         });

      } catch (error) {
         console.error(error.message);
      }
   }

   const createMovie = async (e) => {
      e.preventDefault();

      if (actionChecked) genre.push("Action");
      if (comedyChecked) genre.push("Comedy");
      if (dramaChecked) genre.push("Drama");
      if (fantasyChecked) genre.push("Fantasy");
      if (horrorChecked) genre.push("Horror");
      if (mysteryChecked) genre.push("Mystery");
      if (romanceChecked) genre.push("Romance");
      if (thrillerChecked) genre.push("Thriller");
      if (westernChecked) genre.push("Western");

      try {
         const body={title, description, release_date, duration, genre, studio};
         const res = await fetch('http://localhost:3000/api/movies', {
            method: 'POST',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         })

         console.log(res);
         router.push("/");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <Navigation/>
         <form className="Form__newmovie" onSubmit={createMovie}>
            <div>
               <label>Title</label>
               <input placeholder="ex: Avengers" onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
               <label>Description</label>
               <textarea onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
               <label>Release Date</label>
               <input placeholder="11-09-2020" onChange={e => setRDate(e.target.value)}/>
            </div>
            <div>
            <label>Duration</label>
            <input placeholder="6000" onChange={e => setDuration(e.target.value)}/>
            </div>
            <div>
            <label>Studio</label>
            <input placeholder="Disney" onChange={e => setStudio(e.target.value)}/>
            </div>
            <div>
            <label>Genre</label>
               <div>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={actionChecked} onChange={() => setActionChecked(!actionChecked)}/>
                  Action
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={comedyChecked} onChange={() => setComedyChecked(!comedyChecked)}/>
                  Comedy
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={dramaChecked} onChange={() => setDramaChecked(!dramaChecked)}/>
                  Drama
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={fantasyChecked} onChange={() => setFantasyChecked(!fantasyChecked)}/>
                  Fantasy
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={horrorChecked} onChange={() => setHorrorChecked(!horrorChecked)}/>
                  Horror
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={mysteryChecked} onChange={() => setMysteryChecked(!mysteryChecked)}/>
                  Mystery
               </label >
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={romanceChecked} onChange={() => setRomanceChecked(!romanceChecked)}/>
                  Romance
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={thrillerChecked} onChange={() => setThrillerChecked(!thrillerChecked)}/>
                  Thriller
               </label>
               <label className="checkbox__label">
                  <input className="checkbox" type="checkbox" checked={westernChecked} onChange={() => setWesternChecked(!westernChecked)}/>
                  Western
               </label>
               </div>
            </div>
            {/* <label for="action">Action</label>
            <input id="action" type="checkbox"/> */}
            {/* <input placeholder="Action" onChange={e => setGenre(e.target.value)}/> */}
            {/* <ul>
               {genres.map((genre) => {
                  return (
                     <>
                     <label>{genre.value}</label>
                     <input type="checkbox" value={genre.value} onChange={handleCheck}/>
                     </>
                  );
               })}
            </ul> */}
            <button type="submit">Submit</button>
         </form>
      </div>
   )
}
export default NewMovie;