import { Form, Card, Input, Button, Space, Result, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState } from 'react'

import { useAuth } from '../../hooks/useAuth'
import {
  useCreateNewArticleMutation,
  useEditArticleMutation,
  useGetPostForEditMutation
} from '../../store/API'

const { TextArea } = Input
import './MutateArticleForm.scss'

interface IState {
  title: string
  description: string
  tagList: string[]
  body: string
}

const MutateArticleForm = () => {
  const { slug } = useParams()

  const navigate = useNavigate()

  const [form] = useForm()

  const initialValues = {
    title: '',
    description: '',
    tagList: [],
    body: ''
  }

  const [formInitialState, changeFormInitialState] =
    useState<IState>(initialValues)

  const { isAuth, token } = useAuth()

  const [getPostForEdit, { data: postForEdit, isLoading, isUninitialized }] =
    useGetPostForEditMutation()

  useEffect(() => {
    if (!slug) {
      changeFormInitialState(initialValues)
      form.setFieldsValue(initialValues)
    }
    if (slug) {
      if (isUninitialized) {
        getPostForEdit({ slug, token }).unwrap()
      }
      if (!isLoading && postForEdit) {
        changeFormInitialState({
          body: postForEdit.article.body,
          title: postForEdit.article.title,
          tagList: postForEdit.article.tagList,
          description: postForEdit.article.description
        })
        form.setFieldsValue({
          title: postForEdit.article.title,
          description: postForEdit.article.description,
          body: postForEdit.article.body,
          tagList: postForEdit.article.tagList
        })
      }
    }
  }, [isLoading, slug])

  const [createNewArticle, { data: createData }] = useCreateNewArticleMutation()

  const [editArticle, { data: editData }] = useEditArticleMutation()

  const handleSubmit = (article: object) => {
    if (slug) {
      editArticle({ slug, article, token }).unwrap()
    } else {
      createNewArticle({ article, token }).unwrap()
    }
  }

  const onInputTagChange = (newValue: string, index: number) => {
    const newTags = [...formInitialState.tagList].map((el, elIndex) =>
      elIndex === index ? newValue : el
    )
    changeFormInitialState((prevState) => ({ ...prevState, tagList: newTags }))
  }

  const addTag = (addFn: () => void) => {
    changeFormInitialState((prevState: IState) => {
      return { ...prevState, tagList: [...prevState.tagList, ''] }
    })
    addFn()
  }

  const removeTag = (
    removeFn: (name: number | number[]) => void,
    index: number
  ) => {
    const newTags = [...formInitialState.tagList].filter((el, elIndex) =>
      elIndex === index ? false : true
    )
    changeFormInitialState((prevState: IState) => {
      return { ...prevState, tagList: newTags }
    })

    removeFn(index)
  }

  if (!!editData || !!createData) {
    return (
      <Result
        status="success"
        title="Успешно!"
        subTitle="Хотите перейти на главную страницу?"
        extra={
          <Button type="primary" onClick={() => navigate('/articles')}>
            На главную
          </Button>
        }
      />
    )
  }
  if (!isAuth) {
    return (
      <Result
        status="403"
        title="Упс..."
        subTitle="Кажется, вы не авторизованы."
        extra={
          <Button type="primary" onClick={() => navigate('/sign-in')}>
            На страницу авторизации
          </Button>
        }
      />
    )
  }

  if (isLoading) {
    return (
      <div className="load">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Card
      bordered={false}
      style={{
        width: '90%',
        borderRadius: '5px',
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))',
        margin: '60px auto',
        padding: '24px 8px'
      }}
    >
      <h6 className="form__title">
        {slug ? 'Edit Article' : 'Create new article'}
      </h6>
      <Form
        layout="vertical"
        form={form}
        initialValues={formInitialState}
        size="middle"
        onFinish={handleSubmit}
      >
        <Form.Item
          required={false}
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please, write something' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          required={false}
          label="Short description"
          name="description"
          rules={[{ required: true, message: 'Please, write something' }]}
        >
          <Input placeholder="Short description" />
        </Form.Item>
        <Form.Item
          required={false}
          label="Text"
          name="body"
          rules={[{ required: true, message: 'Please, write something' }]}
        >
          <TextArea placeholder="Body" autoSize={{ minRows: 10 }} />
        </Form.Item>
        <Form.List name="tagList">
          {(fields, { add, remove }) => {
            return (
              <div className="form__tag-list">
                {fields.map((field, index) => {
                  return (
                    <Form.Item key={field.key}>
                      <Form.Item {...field} noStyle>
                        <Space>
                          <Input
                            required={true}
                            placeholder="Tag"
                            style={{ width: '300px' }}
                            defaultValue={formInitialState.tagList[index]}
                            onChange={(event) =>
                              onInputTagChange(event.target.value, index)
                            }
                          />
                          {fields.length >= 1 && (
                            <Button
                              danger
                              onClick={() => {
                                removeTag(remove, index)
                              }}
                            >
                              Delete
                            </Button>
                          )}
                          {index === fields.length - 1 && (
                            <Button block onClick={() => addTag(add)}>
                              Add Tag
                            </Button>
                          )}
                        </Space>
                      </Form.Item>
                    </Form.Item>
                  )
                })}
                {fields.length === 0 && (
                  <Form.Item>
                    <Button block onClick={() => addTag(add)}>
                      Add Tag
                    </Button>
                  </Form.Item>
                )}
              </div>
            )
          }}
        </Form.List>
        <Form.Item name="submit">
          <Button type="primary" htmlType="submit" style={{ width: '300px' }}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default MutateArticleForm
