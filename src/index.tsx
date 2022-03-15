import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './components/App'
import 'antd/dist/antd.min.css'
import './style.scss'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
