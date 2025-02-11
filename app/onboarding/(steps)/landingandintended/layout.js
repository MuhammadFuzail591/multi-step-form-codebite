import { Inter } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LandingPageForm from "../../_components/FormSideBar";
import LandingFormSideBar from "./_components/LandingFormSideBar";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Create Course | CodeBite",
  description: "Created by CodeBite",
};

export default function OnboardingLayout({ children }) {
  return (
    <OnboardingProvider>
    <SidebarProvider>
      <LandingFormSideBar />
      <main className="">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  </OnboardingProvider>

  );
}
