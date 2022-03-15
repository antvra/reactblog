import { Spin, Result, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PostList } from '../components/PostList'
import { useGetPostsQuery } from '../store/API'
import { useAuth } from '../hooks/useAuth'

export const PostListPage = () => {
  const navigate = useNavigate()
  const [page, changePage] = useState(1)
  const { token } = useAuth()

  const {
    data = {},
    isFetching,
    isError,
    refetch
  } = useGetPostsQuery({ page, token })

  useEffect(() => refetch(), [refetch, page])

  if (isFetching) {
    return (
      <div className="load">
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return (
      <Result
        status="500"
        title="Упс..."
        subTitle="Что-то пошло не так"
        extra={
          <Button type="primary" onClick={() => navigate('/articles')}>
            На главную
          </Button>
        }
      />
    )
  }
  return (
    <PostList
      {...data}
      changePage={(newPage: number) => changePage(newPage)}
      currentPage={page}
    />
  )
}
