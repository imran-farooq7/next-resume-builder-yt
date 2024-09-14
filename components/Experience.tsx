"use client";
import { useFormContext } from "@/context/FormContext";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "./Input";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { updateUser } from "@/lib/actions/actions";
import toast from "react-hot-toast";
interface FormValues {
	experiences: {
		company: string;
		role: string;
		startDate: string;
		endDate: string;
		description: string;
	}[];
}

const Experience = () => {
	const [loading, setLoading] = useState(false);
	const context = useFormContext();
	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: context?.formData,
	});
	const { fields, append, remove } = useFieldArray({
		name: "experiences",
		control,
	});
	const handleFormSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			const res = await updateUser(data);
			if (res?.status === "success") {
				toast.success(res.message);
			} else {
				toast.error(res?.message!);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<div>
				<button
					type="button"
					onClick={() =>
						append({
							company: "",
							role: "",
							startDate: "",
							endDate: "",
							description: "",
						})
					}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Add experience
				</button>
			</div>
			{fields.map((field, i) => {
				return (
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-4 mt-8"
						key={field.id}
					>
						<Input
							label="Company"
							{...register(`experiences.${i}.company`, { required: true })}
						/>
						<Input
							label="Role"
							{...register(`experiences.${i}.role`, { required: true })}
						/>
						<Input
							label="Start Date"
							{...register(`experiences.${i}.startDate`, { required: true })}
						/>
						<Input
							label="End Date"
							{...register(`experiences.${i}.endDate`, { required: true })}
						/>
						<div className="mt-2">
							<textarea
								rows={4}
								id="career"
								placeholder="Job Description"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset pl-4 focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
								{...register(`experiences.${i}.description`, {
									required: true,
								})}
							/>
						</div>
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
					{loading ? (
						<span className="animate-pulse">Submitting...</span>
					) : (
						"Submit"
					)}
				</button>
			</div>
		</form>
	);
};

export default Experience;
