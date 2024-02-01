import { getSession } from 'next-auth/react'
import React from 'react'

const blog = ({data}) => {
  return (
    <div>
      <h1>Blog Page - {data}</h1>
    </div>
  )
}

export default blog


export async function getServerSideProps(context){
    const session =await getSession(context)
    return{
      props:{
        data: session ? 'List of 100 personalized blogs' : 'List of free blogs'
      },
    }
}