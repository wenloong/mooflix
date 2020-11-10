var WebHDFS = require('webhdfs');
var hdfs = WebHDFS.createClient({
  user: 'hadoop',
  host: '192.168.1.7',
  port: 9864,
  path: '/webhdfs/v1'
});

var remoteFileStream = hdfs.createReadStream('/movies/Doctor_Strange.mp4');
let dataStream = [];

remoteFileStream.on('error', function onError (err) {
  // Do something with the error
});

remoteFileStream.on('data', function onChunk (chunk) {
  // Do something with the data chunk
  dataStream.push(chunk);
});

remoteFileStream.on('finish', function onFinish () {
  // Upload is done
  console.log('on finish');
  console.log(dataStream);
});