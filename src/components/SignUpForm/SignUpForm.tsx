import { Card, Form, Input, Button, Divider, Checkbox, Result } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './SignUpForm.scss'

interface IProps {
  handleSubmit: (userData: object) => void
  serverErrors: any
  success: boolean
}

const SignUpForm = ({ serverErrors, handleSubmit, success }: IProps) => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  useEffect(() => {
    if (serverErrors?.data.errors.username) {
      form.setFields([
        { name: 'username', errors: [`${serverErrors.data.errors.username}`] }
      ])
    }

    if (serverErrors?.data.errors.email) {
      form.setFields([
        { name: 'email', errors: [`${serverErrors.data.errors.email}`] }
      ])
    }
  }, [serverErrors, form])

  if (success) {
    return (
      <Result
        status="success"
        title="Успешная регистрация!"
        subTitle="Поздравляем с регистрацией. Хотите перейти на страницу авторизации?"
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
      <h6 className="form__title">Create new account</h6>
      <Form layout="vertical" form={form} size="middle" onFinish={handleSubmit}>
        <Form.Item
          required={false}
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username'
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          required={false}
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email address'
            },
            {
              type: 'email',
              message: 'Please enter a valid email'
            }
          ]}
          hasFeedback
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          required={false}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required'
            },
            {
              min: 6,
              message: 'Your password needs to be at least 6 characters.'
            }
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          required={false}
          label="Repeat Password"
          name="repeat"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Repeat password is required'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Passwords must match')
              }
            })
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Repeat Password" />
        </Form.Item>

        <Divider />

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('Should accept agreement')
            }
          ]}
        >
          <Checkbox checked={true}>
            <h6 className="form__checkbox_text">
              I agree to the processing of my personal information
            </h6>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create
          </Button>
        </Form.Item>
      </Form>
      <h6 className="form__prompt">
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </h6>
    </Card>
  )
}

export default SignUpForm
