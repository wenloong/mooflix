import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const NewMovie = () => {
   const [form, setForm] = useState({
      title: '', description: '', release_date: '',
      duration: '', genre: '', studio: ''
   });
   const [file, setMovieFile] = useState([]);
   const router = useRouter();

   const handleChange = (e) => {

   }

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

   const createMovie = async () => {
      try {
         const res = await fetch('http://localhost:3000/api/movies', {
            method: 'POST',
            headers: {
               "Accept": "application/json",
               "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
         })
         router.push("/");
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <form onSubmit={createMovie}>
            <label>Title</label>
            <input placeholder="ex: Avengers"/>
            <label>Description</label>
            <textarea/>
            <label>Release Date</label>
            <input placeholder="11-09-2020"/>
            <label>Duration</label>
            <input placeholder="6000"/>
            <label>Studio</label>
            <input placeholder="Disney"/>
            <label>Genre</label>
            <input placeholder="Action"/>
            <button type="submit">Submit</button>
         </form>
      </div>
   )
}
export default NewMovie;