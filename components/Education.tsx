"use client";
import { useFormContext } from "@/context/FormContext";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "./Input";
import { TrashIcon } from "@heroicons/react/24/outline";
interface FormValues {
	education: {
		qualification: string;
		year: string;
	}[];
}

const Education = () => {
	const context = useFormContext();
	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: context?.formData,
	});
	const { fields, append, remove } = useFieldArray({
		name: "education",
		control,
	});
	const handleFormSubmit = (data: FormValues) => {
		context?.handleFormData(data);
		context?.handleNextStep();
	};
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<div>
				<button
					type="button"
					onClick={() => append({ qualification: "", year: "" })}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Add education
				</button>
			</div>
			{fields.map((field, i) => {
				return (
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 mt-8"
						key={field.id}
					>
						<Input
							label="Qualification"
							{...register(`education.${i}.qualification`, { required: true })}
						/>
						<Input
							label="Year of passing"
							{...register(`education.${i}.year`, { required: true })}
						/>
						<TrashIcon
							onClick={() => remove(i)}
							className="text-red-600 w-8 h-8 mt-8 cursor-pointer"
						/>
					</div>
				);
			})}
			<div className="flex justify-between items-center max-w-4xl mt-40">
				<button
					onClick={() => context?.handlePreviousStep()}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Back{" "}
				</button>
				<button
					type="submit"
					className="bg-emerald-400  text-white py-3 px-10 rounded-lg mt-8 hover:scale-105 transition-all ease-in-out"
				>
					Next{" "}
				</button>
			</div>
		</form>
	);
};

export default Education;
