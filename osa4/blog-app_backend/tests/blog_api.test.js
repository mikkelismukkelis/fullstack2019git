const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Blogi1',
        author: 'Kirjailija Ykkönen',
        url: 'http://www.ygonen.fi',
        likes: 666
    },
    {
        title: 'Blogi2',
        author: 'Kirjailija Kakkonen',
        url: 'http://www.kagonen.fi',
        likes: 555
    },
    {
        title: 'Blogi3',
        author: 'Kirjailija Kolkki',
        url: 'http://www.kolkki.fi',
        likes: 10001
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length)
  })
  
test('the first blog is Kirja1', async () => {
const response = await api.get('/api/blogs')

expect(response.body[0].title).toBe('Blogi1')
})

test('identification field is id, not _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('adding blog ok', async () => {

  const newBlog = {
    title: 'Blogi4',
    author: 'Kirjailija Nelkku',
    url: 'http://www.nelkku.fi',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('Blogi4')
})

test('if likes undefined, default 0 added', async () => {

  const newBlog = {
    title: 'BlogiNolikes',
    author: 'Kirjailija Kukaaneitykkaa',
    url: 'http://www.huono.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[3].likes).toBe(0)
})

test('if no title or url, response 400', async () => {

  const newBlog = {
    // title: 'huuhaa',
    author: 'Kirjailija Kukaaneitykkaa',
    url: 'http://www.huono.fi',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const blogsAtStart = response.body
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

})

test('blog can be edited', async () => {
  const response = await api.get('/api/blogs')
  const blogsAtStart = response.body
  const blogToEdited = blogsAtStart[0]

  const newBlog = {
    title: 'Blogi1',
    author: 'Kirjailija Ykkönen',
    url: 'http://www.ygonen.fi',
    likes: 0 
  } 

  await api
    .put(`/api/blogs/${blogToEdited.id}`)
    .send(newBlog)
    .expect(200)

  const blogsResponse = await api.get('/api/blogs')

  expect(blogsResponse.body[0].likes).toBe(0)

})

afterAll(() => {
  mongoose.connection.close()
})