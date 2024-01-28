import { supabase } from "@/lib/supabase"
import { useState } from "react"

export const useVotes =  () => {
    const [votes, setVotes] =useState<any[]>([])

  const getVotes = async() => {
    const {data, error} = await supabase
    .from('votes')
    .select('*')

    if(data){
        setVotes(data)
    }
  }
  const newVote = async (article_id: number, remove: boolean = false) => {
    const {
        data:{
            session
        }
    } = await supabase.auth.getSession()
    
    if(!session)return alert('Not Authenticated')

    const {user:{id}} = session

    if(remove){
        const {data, error} = await supabase
        .from('votes')
        .delete()
        .eq('article_id', article_id)
        .eq('user_id', id)

        return
    }

    const {data, error} = await supabase
    .from('votes')
    .insert({
        article_id,
        user_id: id
    })
    .select()
    .single()
    setVotes((prev:any) => ({...prev, data}))
}


  return{
    votes,
    getVotes,
    newVote
  }

}