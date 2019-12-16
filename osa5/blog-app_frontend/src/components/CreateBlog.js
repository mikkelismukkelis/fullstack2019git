import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = (props) => {

    const {handleSubmit, titleField,authorField, urlField } = props

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={handleSubmit}>
                <div>
              Title
                    {/* <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                    /> */}
                    <input {...titleField} />
                </div>
                <div>
              Author
                    {/* <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    /> */}
                    <input {...authorField} />
                </div>
                <div>
              Url
                    {/* <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    /> */}
                    <input {...urlField} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

CreateBlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    // handleTitleChange: PropTypes.func.isRequired,
    // handleAuthorChange: PropTypes.func.isRequired,
    // handleUrlChange: PropTypes.func.isRequired,
    // title: PropTypes.string.isRequired,
    // author: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired
}

export default CreateBlogForm