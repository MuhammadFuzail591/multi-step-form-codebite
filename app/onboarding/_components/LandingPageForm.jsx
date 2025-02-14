"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileUpload } from "./FileUpload";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

function LandingPageForm() {
  const router = useRouter();
  const { updateOnboardingData } = useOnboarding();

  const form = useForm({
    defaultValues: {
      courseTitle: "",
      courseSubtitle: "",
      courseDescription: "",
      courseCategory: "",
      courseLanguage: "",
      courseLevel: "",
      courseSubcategory: "",
      image: null, // Add image field
      video: null, // Add video field
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
  } = form;

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const wordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  // Handle image drop
  const onImageDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageFile(file);
      setValue("image", file); // Set the file in the form state
    }
  }, [setValue]);

  // Handle video drop
  const onVideoDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setVideoFile(file);
      setValue("video", file); // Set the file in the form state
    }
  }, [setValue]);

  // Form submission handler
  const onSubmit = (data) => {
    // Create a FormData object to handle file uploads
    const formData = new FormData();

    // Append all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === "image" && imageFile) {
        formData.append(key, imageFile); // Append the image file
      } else if (key === "video" && videoFile) {
        formData.append(key, videoFile); // Append the video file
      } else {
        formData.append(key, data[key]);
      }
    });

    // Convert FormData to a plain object for context
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }

    // Update the context with the form data
    updateOnboardingData(formObject);
    console.log(formObject); // Log the form data
    router.push("/onboarding/landingandintended/intendedlearners")
  };


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* General Info Section */}
        <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
          <h1 className="text-[22px] font-bold">General Info</h1>
          {/* Course Title Field */}
          <FormLabel className="text-lg font-bold ">Course title</FormLabel>
          <FormField
            control={control}
            name="courseTitle"
            rules={{ required: "Course Title is Required" }}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormControl>
                  <Input
                    className="h-12 rounded-2xl"
                    placeholder="Insert your course title"
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
          <FormLabel className="text-lg font-bold ">Course Subtitle</FormLabel>
          <FormField
            control={control}
            name="courseSubtitle"
            rules={{ required: "Course Subtitle is Required" }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormControl>
                  <Input
                    className="h-12 rounded-2xl"
                    placeholder="Insert your course subtitle"
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
          <FormLabel className="text-lg font-bold ">Course Description</FormLabel>
          <FormField
            control={control}
            name="courseDescription"
            rules={{ required: "Course Description is Required" }}
            render={({ field }) => (
              <FormItem className="mt-1">
                <FormControl>
                  <Textarea
                    className="h-[200px] resize-none rounded-2xl"
                    placeholder="Insert your course Description"
                    {...field}
                    {...register("courseDescription", {
                      required: "Description is required",
                      validate: (value) =>
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
        <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
          <h1 className="text-[22px] font-bold">Basic Info</h1>
          <div className="flex flex-wrap gap-4">
            {/* Course Level Dropdown */}
            <FormField
              control={control}
              name="courseLevel"
              rules={{ required: "Course Level is Required" }}
              render={({ field }) => (
                <FormItem className="mt-3 flex-1 min-w-[45%]">
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

            {/* Course Language Dropdown */}
            <FormField
              control={control}
              name="courseLanguage"
              rules={{ required: "Course Language is Required" }}
              render={({ field }) => (
                <FormItem className="mt-3 flex-1 min-w-[45%]">
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

            {/* Course Category Dropdown */}
            <FormField
              control={control}
              name="courseCategory"
              rules={{ required: "Course Category is Required" }}
              render={({ field }) => (
                <FormItem className="mt-3 flex-1 min-w-[45%]">
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

            {/* Course Subcategory Dropdown */}
            <FormField
              control={control}
              name="courseSubcategory"
              rules={{ required: "Course Subcategory is Required" }}
              render={({ field }) => (
                <FormItem className="mt-3 flex-1 min-w-[45%]">
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

        {/* Image Upload Section */}
        <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
          <h1 className="text-[22px] font-bold">Upload Image</h1>
          <p>Upload your course image here. It must meet our <Link href={"#"} className='text-blue-500'>course image quality standards</Link> to be accepted</p>
          <FileUpload
            onDrop={onImageDrop}
            accept="image/*"
            label="Drag & drop an image here, or click to select one"
          />
        </div>

        {/* Video Upload Section */}
        <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
          <h1 className="text-[22px] font-bold">Upload Video</h1>
          <FileUpload
            onDrop={onVideoDrop}
            accept="video/*"
            label="Drag & drop a video here, or click to select one"
          />
        </div>

        <div className="bg-[#F4F5F7] rounded-2xl py-[20px] px-[15px]">
        <h1 className="text-[22px] font-bold">Instructor Profile</h1>
        <div className="flex items-center gap-4 font-bold">
          <div className="w-12 h-12 bg-white border rounded-full border-grey-500 image-div"></div>
          <h3>Yana</h3>
        </div>
        <div>
        <p>Incomplete</p>
        <p>&nbsp; &#9679;	Your instructor biography must have at least 50 words</p>
        <p >&nbsp; &#9679; Your instructor image is required</p>
        </div>
        <Button variant="outline" className="mt-2 bg-white">Update Your profile</Button>
        </div>

        {/* Submit Button */}
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}

export default LandingPageForm;