import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useOnboarding } from '@/context/OnboardingContext';
import React from 'react'
import { useForm } from 'react-hook-form'

function PricingForm() {

    const { updateOnboardingData } = useOnboarding();

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


    function onSubmit(data) {
        updateOnboardingData(data);
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]'>
                    <h1 className='text-[30px] font-bold'>Set a price for your course</h1>
                    <FormField
                        control={control}
                        name='currency'
                        rules={{ required: 'Currency Selection is required' }}
                        render={({ field }) => (
                            <FormItem className='mt-3 flex-1 min-w-[45%]'>
                                <FormControl>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
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
            </form>
        </Form>
    )
}

export default PricingForm