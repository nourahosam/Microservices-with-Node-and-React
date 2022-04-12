const express = require('express');
const app = express();
const crypto = require('crypto');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req,res,next) => {
    res.send(posts);
});

app.post('/posts', (req,res,next) => {
    const id = crypto.randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title};

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log("listening on port 4000 for posts");
});