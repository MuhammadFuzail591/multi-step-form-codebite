"use client";
import { useOnboarding } from "@/context/OnboardingContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

function LandingPageForm() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();

  // Initialize useForm
  const form = useForm({
    defaultValues: { courseTitle: "", courseSubtitle: "", courseDescription: "" }, // Corrected prop name
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register
  } = form;
  //function to count words
  const wordCount = (text) => {
    return text.trim().split(/\s+/).length; // Splits text by spaces and counts words
  };

  // Form submission handler
  function onSubmit(data) {
    updateOnboardingData(data);
    console.log(data);
  }

  return (
    <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
      {/* Pass the form object to the Form component */}
      <h1 className="text-[30px] font-bold">General Info</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Course Title Field */}
          <FormField
            control={control}
            name="courseTitle"
            rules={{ required: "Course Title is Required" }}
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel className="text-xl font-bold">Course title</FormLabel>
                <FormControl>
                  {/* Spread field props into Input */}
                  <Input className="h-12 rounded-2xl" placeholder="Insert your course title" {...field} />
                </FormControl>
                <FormDescription>
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized for search.
                </FormDescription>
                {/* Display error message */}
                <FormMessage>{errors.courseTitle?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Course Subtitle Field */}
          <FormField
            control={control}
            name="courseSubtitle"
            rules={{ required: "Course Subtitle is Required" }}
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel className="text-xl font-bold">Course subtitle</FormLabel>
                <FormControl>
                  {/* Spread field props into Input */}
                  <Input className="h-12 rounded-2xl" placeholder="Insert your course subtitle" {...field} />
                </FormControl>
                <FormDescription>
                  Use 1 or 2 related keywords, and mention 3-4 of the most
                  important areas that you've covered during your course.
                </FormDescription>
                {/* Display error message */}
                <FormMessage>{errors.courseSubtitle?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="courseDescription"
            rules={{ required: "Course Description is Required" }}
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel className="text-xl font-bold">Course description</FormLabel>
                <FormControl>
                  {/* Spread field props into Input */}
                  <Textarea
                  className="h-[200px] resize-none rounded-2xl"
                  placeholder="Insert you course Description"
                {...field}
                {...register("courseDescription", {
                  required: "Description is required",
                  validate: (value) =>
                    wordCount(value) >= 200 || `Must have at least 200 words (currently ${wordCount(value)})`,
                })}
              />
                </FormControl>
                <FormDescription>
                  Description should have minimum 200 words
                </FormDescription>
                {/* Display error message */}
                <FormMessage>{errors.courseSubtitle?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
}

export default LandingPageForm;