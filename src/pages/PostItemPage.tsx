import { Spin, Result, Button } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PostItem } from '../components/PostItem'
import { useAuth } from '../hooks/useAuth'
import { useGetPostWithSlugQuery } from '../store/API'

export const PostItemPage = () => {
  const { slug } = useParams()

  const { token } = useAuth()

  const navigate = useNavigate()

  const { data, isError, isFetching, refetch } = useGetPostWithSlugQuery({
    slug,
    token
  })

  useEffect(() => refetch(), [refetch])

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
    <div className="post-item_openned">
      <PostItem {...data.article} openned={true} />
    </div>
  )
}
