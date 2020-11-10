// var WebHDFS = require('webhdfs');
// var hdfs = WebHDFS.createClient({
//   user: 'hadoop',
//   host: '192.168.1.7',
//   port: 9864,
//   path: '/webhdfs/v1'
// });

// var remoteFileStream = hdfs.createReadStream('/movies/Doctor_Strange.mp4');
// let dataStream = [];

// remoteFileStream.on('error', function onError (err) {
//   // Do something with the error
// });

// remoteFileStream.on('data', function onChunk (chunk) {
//   // Do something with the data chunk
//   dataStream.push(chunk);
// });

// remoteFileStream.on('finish', function onFinish () {
//   // Upload is done
//   console.log('on finish');
//   console.log(dataStream);
// });

// export default remoteFileStream;

const WebHDFS = require("webhdfs");

let url = "http://192.168.1.4";
let port = 9864;
let dir_path = "/movies/";
let path = "/webhdfs/v1/" + dir_path + "?op=OPEN&namenoderpcaddress=localhost:9000&offset=0";
let full_url = url + ':' + port + path;

export default async (req, res) => {
   
}