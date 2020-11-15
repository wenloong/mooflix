import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import http from 'http';
import WebHDFS from 'webhdfs';
import fs from 'fs';

const IP_ADDRESS = "192.168.1.4";
const SUFFIX = "?op=CREATE&namenoderpcaddress=localhost:9000&createflag=&createparent=true&overwrite=false";

const NewMovie = () => {
    const [form , setForm] = useState({ title: '', description: '', release_date: '',
                                        duration: '', genre: ''});
    const [file, setMovieFile] = useState([]);
    const router = useRouter();

    const handleChange = (e) => {
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const movieFile = { file };

            // const hadoopPut = {
            //     hostname: '192.168.1.4',
            //     port: 9870,
            //     path: 'webhdfs/v1/movies/' + 'Avengers.mp4' + "?op=CREATE",
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'nosniff'
            //     } 
            // }

            // const req = http.request(hadoopPut, res => {
            //     console.log(`statusCode: ${res.statusCode}`)
            // })

            // const hadoopCreate = {
            //     hostname: IP_ADDRESS,
            //     port: 9864,
            //     path: 'webhdfs/v1/movies/' + 'Avengers.mp4' + SUFFIX,
            //     method: 'PUT',
                
            // }

            // const reqCreate = http.request(hadoopCreate, res => {
            //     console.log(`statusCode: ${res.statusCode}`)
            // })
            // const hadoopPut = await fetch("http://" + IP_ADDRESS + ":9870/webhdfs/v1/movies/" + file + "?op=CREATE", {
            //     method: "PUT",
            //     headers: { "Content-Type": "nosniff" },
            //     body: movieFile
            // });

            // const hadoopCreate = fetch("http://" + IP_ADDRESS + ":9864/webhdfs/v1/movies/" + file + SUFFIX, {
            //     method: "PUT",
            //     body: movieFile
            // // });
            // console.log(hadoopPut);
            // console.log(hadoopCreate);
            // console.log(req);
            // console.log(reqCreate);
            var hdfs = WebHDFS.createClient({
                user: 'hadoop',
                host: '192.168.1.4',
                port: 9870
            });

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
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="file" value={ file } onChange={ e => setMovieFile(e.target.value) }/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default NewMovie;