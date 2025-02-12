import React from 'react'
import IntendedLearnersForm from '../_components/IntendedLearnersForm'
import Link from 'next/link'

function page() {
  return (
    <div className='p-2'>
      <div className='p-2 font-inter'>
        <h1 className='my-2 text-3xl font-bold'>Intended learners</h1>
        <p>The following descriptions will be publicly visible on your <Link href={"#"} className='text-blue-500'>Course Landing Page</Link>  and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</p>
      </div>
      <IntendedLearnersForm/>
    </div>
  )
}

export default page