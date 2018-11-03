
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

//first blog post article
BlogPosts.create('Blog Post 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nulla ullamcorper, tincidunt mauris non, varius felis. Curabitur vel magna nulla. Fusce ac mauris nisi. Aenean gravida leo eu justo consequat, eleifend posuere libero faucibus. Aenean imperdiet ipsum nec risus condimentum dictum. Aliquam fermentum, libero et iaculis condimentum, dui lorem varius nulla, faucibus commodo nulla diam nec eros. ', 'Justin McIntosh');

//all current blog posts
app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

//POST
app.post('/blog-posts', jsonParser, (req, res) => {
//required field when making a post title, content, author
const requiredFields = ['title', 'content', 'author'];
for (var i = 0; i < requiredFields.length; i++) {
const field = requiredFields[i];
if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
}
const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
res.status(201).json(item);
});

//PUT
app.put('/blog-posts/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Blog Post \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  res.status(204).end();
});

//DELETE
app.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
