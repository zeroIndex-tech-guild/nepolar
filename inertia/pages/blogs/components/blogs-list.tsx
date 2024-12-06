import { Blog } from '~/types/blog'

type Props = {
  blogs: Blog[]
}

export const BlogsList = (props: Props) => {
  const { blogs = [] } = props

  return (
    <ul className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <li
          key={blog.id}
          className="p-4 border border-gray-300 rounded-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold ">{blog.title}</h2>
          <p className="text-sm">
            {blog.createdAt} by {blog.user.fullName}
          </p>
          <p className="text-gray-400 mt-2">{blog.summary}</p>
          <a href={`/blog/${blog.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
            Read More
          </a>
        </li>
      ))}
    </ul>
  )
}
