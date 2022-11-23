const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/trebinje_trailer', function(req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = './trebinje_trailer.mp4';
    const videoSize = fs.statSync(videoPath).size;
    const chunkSize = 1 * 1e6;
    const start = range?Number(range.replace(/\D/g,' ')): Number(' ');
    const end = Math.min(start + chunkSize, videoSize -1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    
    res.writeHead(206,headers);
    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
    
});

// app.all('*', function(req, res) {
//     res.redirect("/");
// });

app.listen(PORT);