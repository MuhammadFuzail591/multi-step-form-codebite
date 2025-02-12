import React from 'react'
import IntendedLearnersForm from '../_components/IntendedLearnersForm'
import Link from 'next/link'

function page() {
  return (
    <div className='p-2'>
      <div className='p-2 font-inter'>
        <h1 className='my-2 text-3xl font-bold'>Course Landing Page</h1>
        <p>Your course landing page is crucial to you success on CodeBite.</p>
        <p>Learn more about <Link href={"#"} className='text-blue-500'>creating your course landing page</Link> and <Link href={"#"} className='text-blue-500'>course title standards</Link></p>
      </div>
      <IntendedLearnersForm/>
    </div>
  )
}

export default page