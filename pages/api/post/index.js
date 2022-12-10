import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middleware/nextConnect';
import validate from '../../../lib/middleware/validation';

import { ironConfig } from '../../../lib/middleware/ironSession';

import { createPostSchema, deletePostSchema } from '../../../modules/post/post.schema';

import { createPost, deletePost, getPosts } from '../../../modules/post/post.service';

const handler = createHandler();

handler
  .post(validate({ body: createPostSchema }), async (req, res) => {
    try {
      if(!req.session.user) return res.status(401).send();

      const newPost = await createPost(req.body, req.session.user);
      res.status(201).send(newPost);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  })
  .get(async (req, res) => {
    try {
      if(!req.session.user) return res.status(401).send();

      const posts = await getPosts();
      res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  })
  .delete(validate(deletePostSchema), async (req, res) => {
    try {
      if(!req.session.user) return res.status(401).send();
      const deletedPost = await deletePost(req.body.id, req.session.user)
      if (deletedPost)
        return res.status(200).send({ ok: true })

      return res.status(400).send('post not found')

    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

  export default withIronSessionApiRoute(handler, ironConfig);