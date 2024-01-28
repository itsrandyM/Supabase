'use-client'

import { useVotes } from "../hooks/useVotes"

export type Article = {
    id: number
    created_at?:string
    content: string
    votes?: any[]
}
export default function ArticleItem({
    article:{
        id,
        content,
        votes
    }
} : {
    article: Article
})
{
   const {newVote} = useVotes()

    return <div className="border flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-400">
        <h2>{content}</h2>
        <div className="grid text-center">
            <span onClick={() => newVote(id)} >Up</span>
            <span>{votes?.length}</span>
            <span onClick={() => newVote(id, true)}>Down</span>
        </div>
        </div>
}
