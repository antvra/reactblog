import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  PostListPage,
  PostItemPage,
  SignInPage,
  SignUpPage,
  NotFoundPage,
  EditProfilePage
} from '../../pages'
import { Header } from '../Header'
import { MutateArticleForm } from '../MutateArticleForm'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/articles" element={<PostListPage />} />
          <Route path="/articles/:slug" element={<PostItemPage />} />
          <Route path="/articles/:slug/edit" element={<MutateArticleForm />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/new-article" element={<MutateArticleForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
