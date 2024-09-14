"use client";
import { createContext, useContext, useState } from "react";
interface FormContext {
	step: number;
	handleNextStep: () => void;
	handlePreviousStep: () => void;
	handleFormData: (data: any) => void;
	formData: {};
}
const FormContext = createContext<FormContext | null>(null);
export const FormProvider = ({ children }: { children: React.ReactNode }) => {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({});
	const handleNextStep = () => {
		if (step >= 0) {
			setStep((prevStep) => prevStep + 1);
		} else {
			return;
		}
	};
	const handlePreviousStep = () => {
		if (step <= 3) {
			setStep((prevStep) => prevStep - 1);
		} else {
			return;
		}
	};
	const handleFormData = (data: any) => {
		setFormData((prev) => ({
			...prev,
			...data,
		}));
	};
	return (
		<FormContext.Provider
			value={{
				step,
				handleFormData,
				handleNextStep,
				handlePreviousStep,
				formData,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};
export const useFormContext = () => {
	return useContext(FormContext);
};
