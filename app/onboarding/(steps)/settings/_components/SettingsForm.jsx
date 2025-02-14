"use client"
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboarding } from '@/context/OnboardingContext';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form'

function SettingsForm() {

    const { updateOnboardingData, onboardingData } = useOnboarding();

    const form = useForm({
        defaultValues: {
            courseStatus: '',
            enrollmentPrivacy: '',
            instructorPermissions: ''
        },

        onBlur: 'onBlur'
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
    } = form;


    function onSubmit(data) {
        updateOnboardingData({
            ...onboardingData,
            courseStatus: data.courseStatus,
            enrollmentPrivacy: data.enrollmentPrivacy,
            instructorPermissions: data.instructorPermissions
        });
        console.log(data)
    }

    return (
        <Form {...form} >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className='bg-[#F4F5F7] rounded-2xl border p-[15px] w-12/12'>
                    <h1 className='text-[20px] font-bold '>Course status</h1>
                    <p className='mb-3 text-sm'>This course is not published on the Codebite.</p>
                    <div className='flex flex-col justify-between gap-4'>
                        {/* <div className='lg:w-8/12'>
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
                        <div className='lg:w-8/12'>
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
                                        <FormMessage>{errors.currency?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </div> */}
                    </div>
                </div>
                <div className='bg-[#F4F5F7] rounded-2xl border p-[15px] w-12/12'>
                    <h1 className='text-[20px] mb-1 font-bold '>Enrollment (Privacy)</h1>
                    <p className='text-sm'>Public courses show up in search results and are available for anyone to take on Codebite.</p>
                    <div className='lg:w-8/12'>
                        <FormField
                            control={control}
                            name='enrollmentPrivacy'
                            rules={{ required: 'Enrollement Privacy Selection is required' }}
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0 flex-1 min-w-[45%]">
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className='rounded-xl' asChild>
                                                <Button variant="outline" className="justify-between w-full">
                                                    {field.value || "Select Privacy"}
                                                    <ChevronDown className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => field.onChange("public")}>
                                                    Public
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => field.onChange("private")}>
                                                    Private
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => field.onChange("key-based")}>
                                                    Key based
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                    <FormMessage>{errors.enrollmentPrivacy?.message}</FormMessage>
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

export default SettingsForm