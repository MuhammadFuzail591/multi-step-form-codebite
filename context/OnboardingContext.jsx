"use client";
import { createContext, useContext, useState } from "react";

// Create the context
const OnboardingContext = createContext();

// Context provider component
export function OnboardingProvider({ children }) {
  const [onboardingData, setOnboardingData] = useState({});

  // Function to update onboarding data
  const updateOnboardingData = (newData) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <OnboardingContext.Provider
      value={{ onboardingData, setOnboardingData, updateOnboardingData }} // Include updateOnboardingData
    >
      {children}
    </OnboardingContext.Provider>
  );
}

// Custom hook to use the context
export function useOnboarding() {
  return useContext(OnboardingContext);
}