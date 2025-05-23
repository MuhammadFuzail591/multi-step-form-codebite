"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboarding } from '@/context/OnboardingContext';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'

function PricingForm() {

    const { updateOnboardingData, onboardingData } = useOnboarding();

    const form = useForm({
        defaultValues: {
            currency: '',
            priceTier: '',
            paymentMethod: '',
            formDelivery: ''
        },

        onBlur: 'onBlur'
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
    } = form;

    const router = useRouter()

    console.log(onboardingData)
    function onSubmit(data) {
        updateOnboardingData({
            ...onboardingData,
            currency: data.currency,
            priceTier: data.priceTier,
            paymentMethod: data.paymentMethod,
            formDelivery: data.formDelivery
        });
        console.log("Updated Context data: ", {
            ...onboardingData,
            currency: data.currency,
            priceTier: data.priceTier,
            paymentMethod: data.paymentMethod,
            formDelivery: data.formDelivery
        })
        router.push("/onboarding/settings")
    }

    return (
        <Form {...form} >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className='bg-[#F4F5F7] rounded-2xl border p-[15px] w-12/12'>
                    <h1 className='text-[20px] mb-3 font-bold '>Set a price for your course</h1>
                    <div className='flex flex-col justify-between gap-4 lg:flex-row'>
                        <div className='lg:w-6/12'>
                            <FormLabel>Currency</FormLabel>
                            <FormField
                                control={control}
                                name='currency'
                                rules={{ required: 'Currency Selection is required' }}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 min-w-[45%]">
                                        <FormControl>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='rounded-xl' asChild>
                                                    <Button variant="outline" className="justify-between w-full">
                                                        {field.value || "Select Currency"}
                                                        <ChevronDown className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => field.onChange("PKR")}>
                                                        PKR
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => field.onChange("USD")}>
                                                        USD
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => field.onChange("INR")}>
                                                        INR
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormMessage>{errors.currency?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='lg:w-6/12'>
                            <FormLabel>Price Tier</FormLabel>
                            <FormField
                                control={control}
                                name='priceTier'
                                rules={{ required: 'Price Tier Selection is required' }}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormControl>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='rounded-xl' asChild>
                                                    <Button variant="outline" className="justify-between w-full">
                                                        {field.value || "Select Price Tier"}
                                                        <ChevronDown className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="rounded-2xl">
                                                    <DropdownMenuItem onClick={() => field.onChange("Free")}>
                                                        Free
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => field.onChange("PKR250")}>
                                                        PKR 250
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => field.onChange("PKR500")}>
                                                        PKR 500
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormMessage>{errors.priceTier?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-[#F4F5F7] rounded-2xl border p-[15px] w-12/12'>
                    <h1 className='text-[20px] mb-1 font-bold '>Payment Method</h1>
                    <p className='text-sm'>Choose your payout method below. Connecting to a new payout method may take a few days.</p>
                    <p className='text-sm'>You won't receive payments to the new linked accournt untill its status in approved.</p>
                    <p className='mb-3 text-sm text-blue-500'><Link href="#">Learn more about payment methods.</Link></p>
                    <div className='flex justify-between gap-4'>
                        <FormField
                            control={control}
                            name="paymentMethod"
                            rules={{ required: 'Payment Method selection is needed' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex flex-col space-y-3'
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="paypal" />
                                                </FormControl>
                                                <FormLabel className="font-bold">PayPal</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="payoneer" />
                                                </FormControl>
                                                <FormLabel className="font-bold">Payoneer (Prepaid masterCard, Local Bank transfer)</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className='bg-[#F4F5F7] rounded-2xl border p-[15px] w-12/12'>
                    <h1 className='text-[20px] mb-1 font-bold '>Tax Form E-Delivery</h1>
                    <p className='mb-2 text-sm'>Got green and get your year-end tax forms electronically (Codebite won't send a copy by mail).</p>
                    <div className='flex justify-between gap-4'>
                        <FormField
                            control={control}
                            name="formDelivery"
                            rules={{ required: 'Form E-Dilivery selection is needed' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex flex-col space-y-3'
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="e-delivery" />
                                                </FormControl>
                                                <FormLabel className="font-bold">E-Delivery</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="paper-delivery" />
                                                </FormControl>
                                                <FormLabel className="font-bold">Paper Delivery</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit"> Submit </Button>
            </form>
        </Form>
    )
}

export default PricingForm