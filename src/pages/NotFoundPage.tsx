import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="not-found">
      <Result
        status="404"
        title="404"
        subTitle="Кажется, данной страницы не существует."
        extra={
          <Button type="primary" onClick={() => navigate('/articles')}>
            На главную
          </Button>
        }
      />
    </div>
  )
}
