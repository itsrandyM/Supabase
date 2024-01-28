'use client'

import { useEffect } from "react";
import { useArticles } from "./hooks/useArticles";
import { supabase } from "@/lib/supabase";
import ArticleItem from "./components/ArticleItem";
//import { useSupabase } from "./hooks/useSupabase";



export default function Home() {

  //const { getSession }  = useSupabase()
 const {articles,getArticles} = useArticles() 

 const subscribedChannel = 
  supabase 
   .channel('articles-follow-up')
   .on('postgres_changes',{
    event:'*',
    schema: 'public',
    table:'votes'
   },  (payload:any) => {
       getArticles()
   })
   .subscribe()
  

  const unsubscribe = () => {
    supabase.removeChannel(subscribedChannel)
  }

    useEffect(() => {
    getArticles()
  },[])

  return (
    <div className="container mx-auto">
      <button onClick={() => unsubscribe()}>Unsubscribe</button>
      <div className="grid gap-4">
        {articles.map((article:any, key:number) => {
          return <ArticleItem key={key} article={article}/>
        }
         )}
      </div>
    </div>
  );
}
