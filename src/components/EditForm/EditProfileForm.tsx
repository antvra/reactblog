import { Card, Form, Input, Button, Result } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useEffect, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import './EditProfileForm.scss'

interface IServerErrors {
  status: number | null
  data: {
    errors: {
      username: string
      email: string
    }
  }
}

interface IUserData {
  username: string
  image: string
  email: string
  password: string
}

interface IProps {
  handleSubmit: (userData: IUserData) => void
  serverErrors: IServerErrors | null
  success: boolean
}

const EditProfileForm = ({ handleSubmit, serverErrors, success }: IProps) => {
  const { isAuth, username, image, email } = useAuth()

  const initialValues = {
    username: username,
    email: email,
    image: image,
    password: ''
  }

  const [form] = useForm()

  const [formFields, changeFormFields] = useState(initialValues)

  const onChangeField = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    changeFormFields((prevState) => ({
      ...prevState,
      [name]: event.target.value
    }))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (serverErrors) {
      if (serverErrors.data.errors.username) {
        form.setFields([
          { name: 'username', errors: [`${serverErrors.data.errors.username}`] }
        ])
      }

      if (serverErrors.data.errors.email) {
        form.setFields([
          { name: 'email', errors: [`${serverErrors.data.errors.email}`] }
        ])
      }
    }
  }, [serverErrors, form])

  if (success) {
    return (
      <Result
        status="success"
        title="Вы успешно изменили свой профиль."
        subTitle="Хотите перейти на главную страницу?"
        extra={
          <Button type="primary" onClick={() => navigate('/articles')}>
            На главную страницу
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
  return (
    <Card
      bordered={false}
      style={{
        width: '384px',
        borderRadius: '5px',
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15))',
        margin: '60px auto',
        padding: '24px 8px'
      }}
    >
      <h6 className="form__title">Edit Profile</h6>
      <Form
        layout="vertical"
        size="middle"
        form={form}
        onFinish={handleSubmit}
        initialValues={formFields}
      >
        <Form.Item
          required={false}
          label="Username"
          name="username"
          hasFeedback
        >
          <Input
            placeholder={username}
            onChange={(event) => onChangeField('username', event)}
          />
        </Form.Item>
        <Form.Item
          required={false}
          label="Email Address"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email'
            }
          ]}
          hasFeedback
        >
          <Input
            placeholder={email}
            onChange={(event) => onChangeField('email', event)}
          />
        </Form.Item>
        <Form.Item
          required={false}
          label="New Password"
          name="password"
          rules={[
            {
              min: 6,
              message: 'Your password needs to be at least 6 characters.'
            }
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="New Password"
            onChange={(event) => onChangeField('password', event)}
          />
        </Form.Item>
        <Form.Item label="Avatar Image (URL)" name="image">
          <Input
            type="url"
            placeholder={image}
            onChange={(event) => onChangeField('image', event)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditProfileForm
