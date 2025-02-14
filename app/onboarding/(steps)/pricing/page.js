import React from 'react'
import PricingForm from './_components/PricingForm'

const PricingFormPage = () => {
  return (
    <div className='w-11/12 mx-auto md:mx-0 md:w-8/12'>
      <div className='p-2 font-inter'>
        <h1 className='my-2 text-3xl font-bold'>Pricing</h1>
        <p>Please select the currency and the price tier for your course. If you'ld like to offer your course for free. It must have a total video length of less than 2 hours. also, courses with practice tests can not be free.</p>
      </div>
      <PricingForm/>
    </div>
  )
}

export default PricingFormPage
