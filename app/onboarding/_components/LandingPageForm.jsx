'use client';
import { useOnboarding } from '@/context/OnboardingContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronRight } from 'lucide-react'; // Import the right arrow icon

function LandingPageForm() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();

  const form = useForm({
    defaultValues: {
      courseTitle: '',
      courseSubtitle: '',
      courseDescription: '',
      courseCategory: '', // Existing field
      courseLanguage: '', // New field
      courseLevel: '', // New field
      courseSubcategory: '', // New field
    },
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = form;

  const wordCount = text => {
    return text.trim().split(/\s+/).length;
  };

  function onSubmit(data) {
    updateOnboardingData(data);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* General Info Section */}
        <div className='bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]'>
          <h1 className='text-[30px] font-bold'>General Info</h1>
          {/* Course Title Field */}
          <FormField
            control={control}
            name='courseTitle'
            rules={{ required: 'Course Title is Required' }}
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormControl>
                  <Input
                    className='h-12 rounded-2xl'
                    placeholder='Insert your course title'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized for search.
                </FormDescription>
                <FormMessage>{errors.courseTitle?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Course Subtitle Field */}
          <FormField
            control={control}
            name='courseSubtitle'
            rules={{ required: 'Course Subtitle is Required' }}
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormControl>
                  <Input
                    className='h-12 rounded-2xl'
                    placeholder='Insert your course subtitle'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use 1 or 2 related keywords, and mention 3-4 of the most
                  important areas that you've covered during your course.
                </FormDescription>
                <FormMessage>{errors.courseSubtitle?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Course Description Field */}
          <FormField
            control={control}
            name='courseDescription'
            rules={{ required: 'Course Description is Required' }}
            render={({ field }) => (
              <FormItem className='mt-3'>
                <FormControl>
                  <Textarea
                    className='h-[200px] resize-none rounded-2xl'
                    placeholder='Insert your course Description'
                    {...field}
                    {...register('courseDescription', {
                      required: 'Description is required',
                      validate: value =>
                        wordCount(value) >= 2 ||
                        `Must have at least 200 words (currently ${wordCount(
                          value
                        )})`,
                    })}
                  />
                </FormControl>
                <FormDescription>
                  Description should have a minimum of 200 words.
                </FormDescription>
                <FormMessage>{errors.courseDescription?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        {/* Basic Info Section */}
        <div className='bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]'>
          <h1 className='text-[30px] font-bold'>Basic Info</h1>
          <div className='flex flex-wrap gap-4'>
          <FormField
              control={control}
              name='courseLevel'
              rules={{ required: 'Course Level is Required' }}
              render={({ field }) => (
                <FormItem className='mt-3 flex-1 min-w-[45%]'>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                          {field.value || "Select Level"}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => field.onChange("Beginner")}>
                          Beginner
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Intermediate")}>
                          Intermediate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Advanced")}>
                          Advanced
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage>{errors.courseLevel?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='courseLanguage'
              rules={{ required: 'Course Language is Required' }}
              render={({ field }) => (
                <FormItem className='mt-3 flex-1 min-w-[45%]'>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                          {field.value || "Select Language"}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => field.onChange("English")}>
                          English
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Spanish")}>
                          Spanish
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("French")}>
                          French
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("German")}>
                          German
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage>{errors.courseLanguage?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='courseCategory'
              rules={{ required: 'Course Category is Required' }}
              render={({ field }) => (
                <FormItem className='mt-3 flex-1 min-w-[45%]'>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                          {field.value || "Select Category"}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => field.onChange("Web Development")}>
                          Web Development
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Data Science")}>
                          Data Science
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Mobile Development")}>
                          Mobile Development
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("UI/UX Design")}>
                          UI/UX Design
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage>{errors.courseCategory?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='courseSubcategory'
              rules={{ required: 'Course Subcategory is Required' }}
              render={({ field }) => (
                <FormItem className='mt-3 flex-1 min-w-[45%]'>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                          {field.value || "Select Subcategory"}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => field.onChange("Frontend Development")}>
                          Frontend Development
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Backend Development")}>
                          Backend Development
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Machine Learning")}>
                          Machine Learning
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => field.onChange("Mobile App Design")}>
                          Mobile App Design
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage>{errors.courseSubcategory?.message}</FormMessage>
                </FormItem>
              )}
            />       
          </div>
        </div>

        {/* Submit Button */}
        <Button type='submit'>Next</Button>
      </form>
    </Form>
  );
}

export default LandingPageForm;