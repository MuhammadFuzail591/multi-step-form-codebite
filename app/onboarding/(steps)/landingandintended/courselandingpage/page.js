import React from 'react'
import LandingPageForm from '../../../_components/LandingPageForm'
import Link from 'next/link'

function CourseLandingFormPage() {
  return (
    <div className='p-2'>
      <div className='p-2 font-inter'>
        <h1 className='my-2 text-3xl font-bold'>Course Landing Page</h1>
        <p>Your course landing page is crucial to you success on CodeBite.</p>
        <p>Learn mor about <Link href={"#"} className='text-blue-500'>creating your course landing page</Link> and <Link href={"#"} className='text-blue-500'>course title standards</Link></p>
      </div>
      <LandingPageForm />
    </div>
  )
}

export default CourseLandingFormPage