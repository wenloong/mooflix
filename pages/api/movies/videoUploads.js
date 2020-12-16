import Files from '../../../models/File';

const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

Grid.mongo = mongoose.mongo;
var gfs;

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                gfs.files.find({
                    filename: req.params.imgname
                }).toArray(function(err, files) {
                    if (files.length === 0) {
                        return res.status(400).send({
                            message: 'File not found'
                        });
                    }

                    console.log(files);
                    let data = [];
                    let readStream = gfs.createReadStream({
                        filename: files[0].filename
                    });

                    readStream.on('data', function(chunk) {
                        data.push(chunk);
                    });

                    readStream.on('end', () => {
                        data = Buffer.concat(data);
                        let type = fileType(data);
                        res.writeHead(200, {
                            'Content-Type': type.mime,
                            'Content-disposition': 'attachment; filename=' + files.filename + '.' + type.ext,
                            'Content-Length': file.length
                        });
                        res.end(data);
                    });
                    readStream.on('error', (err) => {
                        logger.error(`Error downloading file, error: ${err}`);
                        res.status(400).send({
                            message: `Error, while downloading a file, with error: ${err}`
                        });
                    })
                })
            } catch (error) {
                console.error(error);
            }
        case 'POST':
            try {
                let { file } = req.files;
                let writeStream = gfs.createReadStream({
                    filename: `${file.name}`,
                    mode: 'w',
                    content_type: file.mimetype
                });
                writeStream.on('close', function (uploadedFile) {
                    Files.create({
                        doc_id: uploadedFile._id,
                        length: uploadedFile.length,
                        name: uploadedFile.filename,
                        type: uploadedFile.contentType
                    })
                    .then(file => res.json({
                        success: true,
                        message: "File was saved with success"
                    }))
                    .catch(err => {
                        logger.error(`Error, while uploading new files, with error: ${err}`);
                        res.status(500).json({
                            message: `Error while uploading new files, with error: ${err}`
                        })
                    })
                })
                writeStream.write(file.data);
                writeStream.end();
            } catch (error) {
                console.error(error);
            }
    }
}