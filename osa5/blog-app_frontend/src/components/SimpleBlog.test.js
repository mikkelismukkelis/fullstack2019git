import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'blogin titteli',
    author: 'Kepe Kettunen',
    likes: 100
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()

  const div1 = component.container.querySelector('.titleAuthor')
  expect(div1).toHaveTextContent(
    'blogin titteli Kepe Kettunen'
  )


  const div2 = component.container.querySelector('.likes')
  expect(div2).toHaveTextContent(
    'blog has 100 likes'
  )


})

test('clicking the button calls event handler twice', async () => {
    const blog = {
        title: 'blogin titteli',
        author: 'Kepe Kettunen',
        likes: 100
      }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })