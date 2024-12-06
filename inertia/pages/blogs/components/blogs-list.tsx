import { Blog } from '~/types/blog'
import { BlogListCard } from './blogs-list-card'

type Props = {
  blogs: Blog[]
}

export const BlogsList = (props: Props) => {
  const { blogs = [] } = props

  return (
    <ul className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <BlogListCard blog={blog} />
      ))}
    </ul>
  )
}
