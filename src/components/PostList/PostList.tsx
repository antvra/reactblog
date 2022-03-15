import { List, Pagination } from 'antd'
import { v4 } from 'uuid'

import { PostItem } from '../PostItem'
import './PostList.scss'

interface IPost {
  openned: boolean
  author: {
    bio: string | null
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: Array<string>
  title: string
  updatedAt: string
}

interface IPostListProps {
  currentPage: number
  changePage: (page: number) => void
  articles: Array<IPost>
  articlesCount: number
}

const PostList = ({
  articles,
  articlesCount,
  currentPage,
  changePage
}: IPostListProps) => {
  return (
    <List size="large" loading={!articles}>
      {articles.map((el) => {
        return (
          <List.Item key={v4()}>
            <PostItem {...el} openned={false} />
          </List.Item>
        )
      })}
      <List.Item>
        <Pagination
          size="small"
          pageSize={5}
          showSizeChanger={false}
          current={currentPage}
          onChange={(newPage) => changePage(newPage)}
          total={articlesCount}
        />
      </List.Item>
    </List>
  )
}

export default PostList
