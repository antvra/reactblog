import { Card, Form, Input, Button, Result } from 'antd'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignInForm.scss'

interface IServerErrors {
  status: number | null
  data: object
}

interface IProps {
  handleSubmit: (userData: object) => void
  serverErrors: IServerErrors | null
  success: boolean
}

const SignInForm = ({ serverErrors, handleSubmit, success }: IProps) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (serverErrors) {
      form.setFields([
        { name: 'password', errors: ['Username or password is invalid'] },
        { name: 'email', errors: ['Username or password is invalid'] }
      ])
    }
  }, [serverErrors, form])

  if (success) {
    return (
      <Result
        status="success"
        title="Успешная авторизация!"
        subTitle="Хотите перейти на главную?"
        extra={
          <Button type="primary" onClick={() => navigate('/articles')}>
            На главную
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
      <h6 className="form__title">Sign In</h6>
      <Form
        autoComplete="off"
        form={form}
        layout="vertical"
        size="middle"
        onFinish={handleSubmit}
      >
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

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <h6 className="form__prompt">
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </h6>
    </Card>
  )
}

export default SignInForm
