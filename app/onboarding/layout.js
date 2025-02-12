import { Inter } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FormSideBar from "./_components/FormSideBar";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Create Course | CodeBite",
  description: "Created by CodeBite",
};

export default function OnboardingLayout({ children }) {
  return (
    <OnboardingProvider>
          <SidebarProvider>
            <FormSideBar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
    </OnboardingProvider>

  );
}
