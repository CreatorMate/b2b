export type Serie = {
    id: number
    name: string,
    posts: number,
    stories: number,
    tags: string,
    description: string,
    reach_per_post: number,
    new_vs_existing: number,
    followers_interested: number,
    impressions: number,
    content: SerieContent[]
}

export type SerieContent = {
    id: number
    url: string,
    likes: number,
    comments: number,
    instagram_link: string,
    isVideo: boolean
}