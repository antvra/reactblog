export interface IPost {
  openned: boolean
  author: {
    bio: string | null
    following: boolean
    image: string
    username: string
  }
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: Array<string>
  title: string
  updatedAt: string
}
