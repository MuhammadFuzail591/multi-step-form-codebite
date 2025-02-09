import { Inter } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Create Course | CodeBite",
  description: "Created by CodeBite",
};

export default function OnboardingLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <OnboardingProvider>
            {children}
        </OnboardingProvider>
      </body>
    </html>
  );
}
