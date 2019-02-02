const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;
const upload = multer({dest: '/tmp'});

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'))
;
app.post('/search', upload.single('word-search'), (req, res) => {
	console.log (req.file);
	fs.readFile(req.file.path, (err, data) => {
		res.send(data)
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
