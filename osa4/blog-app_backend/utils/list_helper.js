const dummy = (blogs) => {
  return 1
}
  
const totalLikes = (blogs) => {
  let sum=0
  blogs.forEach(b => sum += b.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let bestBlog

  blogs.forEach(b => {
    b.likes >= mostLikes ? mostLikes = b.likes : mostLikes = mostLikes
  })

  blogs.forEach(b => {
    if (b.likes === mostLikes) {
      bestBlog = b
    }
  })
  return bestBlog
}

function mostOccurences(authors){
  return authors.sort((a,b) =>
    authors.filter(v => v===a).length
    - authors.filter(v => v===b).length
  ).pop();
}

const mostBlogs = (blogs) => {
  let authors = []

  blogs.forEach(b => {
    // console.log('autori',b.author)
    authors.push(b.author)
  })

  // console.log('mostblogs', mostOccurences(authors))

  return 1
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}