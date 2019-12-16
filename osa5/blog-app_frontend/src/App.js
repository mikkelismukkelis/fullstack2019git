import React, { useState, useEffect } from 'react'
import blogsService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlog'
import Togglable from './components/Togglable'
import { useField } from './hooks/indexHooks'

function App() {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const usernameField = useField('text')
    const passwordField = useField('password')
    const titleField= useField('text')
    const authorField= useField('text')
    const urlField= useField('text')



    useEffect(() => {
        blogsService
            .getAll()
            .then(initialBlogs => {
                setBlogs(initialBlogs)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogsService.setToken(user.token)
        }
    }, [])

    const removeReset = ({ reset, ...rest }) => rest
   
    const handleLogin = async (event) => {
        event.preventDefault()
        let username= usernameField.value
        let password = passwordField.value

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogsService.setToken(user.token)
            setUser(user)
            usernameField.reset()
            passwordField.reset()
        } catch (exception) {
            console.log('Erro in login', exception)
        }
    }

    const handleCreateNew = (e) => {
        e.preventDefault()
        const blogObject = {
            title: titleField.value,
            author: authorField.value,
            url: urlField.value
        }

        blogsService
            .create(blogObject)
            .then(data => {
                setBlogs(blogs.concat(data))
                titleField.reset()
                authorField.reset()
                urlField.reset()
            })
    }

    const loginForm = () => {
        let usernameFieldNoReset = removeReset(usernameField)
        let passwordFieldNoReset = removeReset(passwordField)
        return (
            <div>
                <h2>Log in to application</h2>

                <form onSubmit={handleLogin}>
                    <div>
                        Username
                        <input {...usernameFieldNoReset} />
                    </div>
                    <div>
                        Password
                        <input {...passwordFieldNoReset} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }

    const logoutUser = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        window.location.reload()
    }


    const createNewBlogForm = () => {
        let titleFieldNoReset = removeReset(titleField)
        let authorFieldNoReset = removeReset(authorField)
        let urlFieldNoReset = removeReset(urlField)

        return (
            <div>

                <Togglable buttonLabel='New note'>
                    <CreateBlogForm
                        handleSubmit={handleCreateNew}
                        titleField={titleFieldNoReset}
                        authorField={authorFieldNoReset}
                        urlField={urlFieldNoReset}
                    />
                </Togglable>
            </div>
        )
    }


    const blogsForm = () => {
        const userBlogs = blogs.filter(blog => blog.author === user.username)

        return (
            <div>
                <h2>Blogs</h2>
                <p>{user.name} logged in <button onClick={logoutUser}>Logout</button></p>
                {createNewBlogForm()}
                {userBlogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        )

    }



    return (
        <div>
            {user === null ?  loginForm() : blogsForm()}

        </div>
    )
}

export default App
