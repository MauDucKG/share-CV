import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

// TODO: refactor types
export type NextPageWithLayout<PageProps = {}> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Paper" | "Page"

export type TBlog = {
  _id: string
  date: { start_date: string }
  type: TPostType[]
  slug: string
  tags?: string[]
  category?: string[]
  summary?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  fullWidth: boolean
  thumbnail?: string
  experience: string
  location?: string
}

export type TPost = {
  _id: string
  date: { start_date: string }
  type: TPostType[]
  slug: string
  tags?: string[]
  category?: string[]
  summary?: string
  content?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  fullWidth: boolean
  thumbnail?: string
  experience: string
  location?: string
}

export type TUser = {
  login: string;
    id: number;
    node_id: string | null;
    avatar_url: string | null;
    gravatar_id: string | null;
    url: string | null;
    html_url: string | null;
    type: string | null;
    site_admin: boolean;
    name: string | null;
    company: null | null;
    blog: string | null;
    location: string | null,
    email: string | null,
    hireable: string | null,
    bio: string | null,
    twitter_username: string | null,
    public_repos: number,
    public_gists: number,
    followers: number,
    following: number,
    created_at: string | null,
    updated_at: string | null
}

export type PostDetail = TPost & {
  recordMap: string
}

export type BlogDetail = TBlog & {
  recordMap: string
}
export type TBlogs = TBlog[]

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}

export type ThemeType = "dark" | "light"
