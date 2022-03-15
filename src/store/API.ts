import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BlogAPI = createApi({
  reducerPath: 'BlogAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kata.academy:8021/' }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page, token }) => ({
        url: `api/articles?limit=5&offset=${(page - 1) * 5}`,
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    getPostWithSlug: build.query({
      query: ({ slug, token }) => ({
        url: `api/articles/${slug}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    getPostForEdit: build.mutation({
      query: ({ slug, token }) => ({
        url: `api/articles/${slug}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    registerNewUser: build.mutation({
      query: (userData) => ({
        url: 'api/users',
        method: 'POST',
        body: { user: userData }
      })
    }),
    loginExistingUser: build.mutation({
      query: (userData) => ({
        url: 'api/users/login',
        method: 'POST',
        body: { user: userData }
      })
    }),
    createNewArticle: build.mutation({
      query: ({ article, token }) => ({
        url: '/api/articles',
        method: 'POST',
        body: { article: article },
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    likeArticle: build.mutation({
      query: ({ slug, token, likeState }) => ({
        url: `/api/articles/${slug}/favorite`,
        method: !likeState.like ? 'POST' : 'DELETE',
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    editProfile: build.mutation({
      query: ({ userData, token }) => ({
        url: 'api/user',
        method: 'PUT',
        body: { user: userData },
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    deleteArticle: build.mutation({
      query: ({ slug, token }) => ({
        url: `api/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`
        }
      })
    }),
    editArticle: build.mutation({
      query: ({ slug, article, token }) => ({
        url: `api/articles/${slug}`,
        method: 'PUT',
        body: { article: article },
        headers: {
          Authorization: `Token ${token}`
        }
      })
    })
  })
})

export const {
  useGetPostsQuery,
  useGetPostWithSlugQuery,
  useRegisterNewUserMutation,
  useLoginExistingUserMutation,
  useCreateNewArticleMutation,
  useLikeArticleMutation,
  useEditProfileMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useGetPostForEditMutation
} = BlogAPI
