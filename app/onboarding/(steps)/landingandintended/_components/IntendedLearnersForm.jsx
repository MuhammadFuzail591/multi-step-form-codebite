"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/context/OnboardingContext";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function DynamicFormComponent() {
  const { updateOnboardingData, onboardingData } = useOnboarding(); // Access the same context

  const router = useRouter()
  const form = useForm({
    defaultValues: {
      learningObjectives: onboardingData.learningObjectives || [""], // Array of strings
      requirements: onboardingData.requirements || [""], // Array of strings
      intendedLearners: onboardingData.intendedLearners || [""], // Array of strings
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const learningObjectives = watch("learningObjectives");
  const requirements = watch("requirements");
  const intendedLearners = watch("intendedLearners");

  // Add a new section to a dynamic field
  const addSection = (fieldName) => {
    const currentSections = watch(fieldName);
    setValue(fieldName, [...currentSections, ""]); // Add an empty string for a new section
  };

  // Remove a section from a dynamic field
  const removeSection = (fieldName, index) => {
    const currentSections = watch(fieldName);
    const updatedSections = currentSections.filter((_, i) => i !== index);
    setValue(fieldName, updatedSections);
  };

  // Form submission handler
  const onSubmit = (data) => {
    // Update the context with the new data
    updateOnboardingData({
      ...onboardingData, // Preserve existing data
      learningObjectives: data.learningObjectives,
      requirements: data.requirements,
      intendedLearners: data.intendedLearners,
    });
    console.log("Updated Context Data:", {
      ...onboardingData,
      learningObjectives: data.learningObjectives,
      requirements: data.requirements,
      intendedLearners: data.intendedLearners,
    });

    router.push("/onboarding/pricing")
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-2xl">
        {/* Learning Objectives Section */}
        <div className="bg-[#F4F5F7] p-4 rounded-2xl">
          <h2 className="mb-3 text-xl font-semibold">Learning Objectives</h2>
          <h3 className="mb-2 font-semibold">What will students learn from your course?</h3>
          <p>You must enter at least 4 <Link className="text-blue-500" href="#">learning objectives or outcomes</Link> that learners can expect to achieve after completing your course.</p>
          {learningObjectives.map((_, index) => (
            <div key={index} className="flex items-center gap-2 mt-3">
              <FormField
                control={control}
                name={`learningObjectives.${index}`}
                rules={{ required: "Learning Objective is required" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="h-12 rounded-2xl" placeholder="Example: Define the roles and responsibilities of a project manager" {...field} />
                    </FormControl>
                    <FormMessage>{errors.learningObjectives?.[index]?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {
                (learningObjectives[index].length > 1) ? <Button
                  type="button"
                  onClick={() => removeSection("learningObjectives", index)}
                  className="text-red-600 hover:bg-red-50"
                  variant="outline"
                >
                  <X />
                </Button> : ""
              }
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addSection("learningObjectives")} className="flex items-center gap-2 mt-4 bg-white">
            <Plus size={16} /> Add more to your response
          </Button>
        </div>

        {/* Requirements Section */}
        <div className="bg-[#F4F5F7] p-4 rounded-2xl">
          <h2 className="mb-3 text-xl font-semibold">Requirements</h2>
          <h3 className="mb-2 font-semibold">What are ther requirements or prerequisites for taking your course?</h3>
          <p>List the required skills, experience, tools or equipment learners should have prior to taking your course. If there are no requirements, use this space as an oppurtunity to lower the barrier for beginners.</p>
          {requirements.map((_, index) => (
            <div key={index} className="flex items-center gap-2 mt-3">
              <FormField
                control={control}
                name={`requirements.${index}`}
                rules={{ required: "Requirement is required" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="h-12 rounded-2xl" placeholder="Example: No programming experience is needed." {...field} />
                    </FormControl>
                    <FormMessage>{errors.requirements?.[index]?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {
                (requirements[index].length > 1) ? <Button
                  type="button"
                  onClick={() => removeSection("requirements", index)}
                  className="text-red-600 hover:bg-red-50"
                  variant="outline"
                >
                  <X />
                </Button> : ""
              }
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addSection("requirements")} className="flex items-center gap-2 mt-4">
            <Plus size={16} /> Add more to your response
          </Button>
        </div>

        {/* Intended Learners Section */}
        <div className="bg-[#F4F5F7] p-4 rounded-2xl">
          <h2 className="mb-3 text-xl font-semibold">Intended Learners</h2>
          <h3 className="mb-2 font-semibold">Who is this course for?</h3>
          <p>Write a clear description of the <Link className="text-blue-500" href="#">Intended learners</Link> for your course who will find your course content valuable. This will help you attract the right learners to your course.</p>
          {intendedLearners.map((_, index) => (
            <div key={index} className="flex items-center gap-2 mt-3">
              <FormField
                control={control}
                name={`intendedLearners.${index}`}
                rules={{ required: "Intended Learner is required" }}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input className="h-12 rounded-2xl" placeholder="Example: Beginner Python developers curious about data science" {...field} />
                    </FormControl>
                    <FormMessage>{errors.intendedLearners?.[index]?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {
                (intendedLearners[index].length > 1) ? <Button
                  type="button"
                  onClick={() => removeSection("intendedLearners", index)}
                  className="text-red-600 hover:bg-red-50"
                  variant="outline"
                >
                  <X />
                </Button> : ""
              }
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => addSection("intendedLearners")} className="flex items-center gap-2 mt-4 bg-white ">
            <Plus size={16} /> Add more to your response
          </Button>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4">Save and Continue</Button>
      </form>
    </Form>
  );
}

export default DynamicFormComponent;