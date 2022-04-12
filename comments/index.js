const express = require('express');
const app = express();
const crypto = require('crypto');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res,next) => {
    res.send(commentsByPostId[req.params.id]);
});

app.post('/posts/:id/comments', (req,res,next) => {
    const id = crypto.randomBytes(4).toString('hex');
    const { content } = req.body;

    const allComments = commentsByPostId[req.params.id] || [];

    allComments.push({id, content});
    commentsByPostId[req.params.id] = allComments;

    res.status(201).send(commentsByPostId[req.params.id]);
});

app.listen(4001, () => {
    console.log("listening on port 4001 for comments");
});