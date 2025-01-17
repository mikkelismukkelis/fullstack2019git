const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

  response.json(blogs.map(blog => blog.toJSON()))

})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
      }
      let user = null
      if (body.userId === undefined) {
        user = await User.findById('5dd9020c43091621f01581d5')
      } else {
        user = await User.findById(decodedToken.id)
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
      })

      if (blog.title === undefined || blog.url === undefined) {
        response.status(400)
      }

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())


    } catch(exception) {
      console.log('exc:', exception)
    }
    

    

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log('ERROR', exception)
  }
})


blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400)
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => console.log('ERROR:', error))
})

module.exports = blogsRouter