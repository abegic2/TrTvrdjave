const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});



app.get('/trebinje_trailer', function(req,res) {
    const range = req.headers.range;
    const videoPath = './trebinje_trailer.mp4';

    const options = {};
    let start;
    let end;

    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", "video/mp4");

    fs.stat(videoPath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${videoPath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;

        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        }
        else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            const fileStream = fs.createReadStream(videoPath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${videoPath}.`);
                console.log(error);
                res.sendStatus(500);
            });
            
            fileStream.pipe(res);
        }
    });


});

app.all('*', function(req, res) {
    res.redirect("/");
});

app.listen(PORT);