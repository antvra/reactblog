import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { Card, Tag, Avatar, Button, message, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { marked } from 'marked'
import { v4 } from 'uuid'
import { useEffect, useState } from 'react'

import { IPost } from '../../types/types'
import './PostItem.scss'
import { useAuth } from '../../hooks/useAuth'
import {
  useDeleteArticleMutation,
  useLikeArticleMutation
} from '../../store/API'

interface IPostWithOpenned extends IPost {
  openned: boolean
}

const PostItem = ({
  openned,
  author,
  body,
  createdAt,
  description,
  favorited,
  favoritesCount,
  slug,
  tagList,
  title
}: IPostWithOpenned) => {
  const rawMarkup = () => {
    if (body) {
      const markedRaw = marked(body)
      return { __html: markedRaw }
    }
    return { __html: '' }
  }

  const navigate = useNavigate()

  const { isAuth, username, token } = useAuth()

  const [likeState, changeLikeState] = useState({
    like: favorited,
    likesCount: favoritesCount
  })

  const [deleteArticle, { isSuccess: articleDeleteSuccess }] =
    useDeleteArticleMutation()

  const [likeArticle] = useLikeArticleMutation()

  const handleDelete = () => {
    deleteArticle({ slug, token })
  }

  useEffect(() => {
    if (articleDeleteSuccess) {
      message.success('Article deleted', 2).then(() => navigate('/'))
    }
  }, [articleDeleteSuccess, navigate])

  const handleLike = () => {
    if (token) {
      changeLikeState((prev) => {
        return {
          like: !prev.like,
          likesCount: prev.like ? prev.likesCount - 1 : prev.likesCount + 1
        }
      })
      likeArticle({ slug, token, likeState })
    } else {
      message.warning('Ошибка: кажется, вы не авторизованы.')
    }
  }

  return (
    <Card
      bordered={false}
      style={{
        width: '50rem',
        borderRadius: '5px',
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))'
      }}
    >
      <div className="post-item_closed">
        <div className="post-item__description">
          <div className="post-item__header">
            <Link to={`/articles/${slug}`} className="post-item__title">
              {title}
            </Link>
            <div className="post-item__rate" onClick={handleLike}>
              {isAuth && likeState.like ? (
                <HeartFilled style={{ color: 'red' }} />
              ) : (
                <HeartOutlined />
              )}
              <h5 className="post-item__rate_count">{likeState.likesCount}</h5>
            </div>
          </div>
          <div className="post-item__tags">
            {tagList.map((tag) => {
              if (tag) {
                return <Tag key={v4()}>{tag}</Tag>
              }
              return null
            })}
          </div>
          <div
            className={'post-item__text' + (openned ? '_openned' : '_closed')}
          >
            {description}
          </div>
        </div>
        <div className="post-item__meta">
          <div className="post-item__meta_closed">
            <div className="post-item__author">
              <h6 className="post-item__author-name">{author.username}</h6>
              <h6 className="post-item__date">
                {format(new Date(createdAt), 'MMMM d, yyyy')}
              </h6>
            </div>
            <Avatar size={'large'} src={author.image} />
          </div>
          {openned && author.username === username && (
            <div className="post-item__meta_openned">
              <Popconfirm
                placement="bottomLeft"
                title="Are you sure to delete this article?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  className="post-item__meta-button post-item__meta-button_delete"
                  style={{
                    display: 'flex',
                    height: '30px',
                    borderRadius: '5px'
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
              <NavLink
                to={`/articles/${slug}/edit`}
                className="post-item__meta-button post-item__meta-button_edit"
              >
                Edit
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {openned && (
        <div
          className="post-item__body"
          dangerouslySetInnerHTML={rawMarkup()}
        ></div>
      )}
    </Card>
  )
}

export default PostItem
