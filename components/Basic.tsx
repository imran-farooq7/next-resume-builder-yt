"use client";
import { useFormContext } from "@/context/FormContext";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import { uploadThumbnail } from "@/lib/actions/supabse/client";
interface FormValue {
	name: string;
	email: string;
	phone: string;
	career: string;
	profileImgUrl: any;
}
const Basic = () => {
	const context = useFormContext();
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm<FormValue>({
		defaultValues: context?.formData,
	});
	const handleFormSubmit = async (data: FormValue) => {
		setLoading(true);
		console.log(data.profileImgUrl);
		const url = await uploadThumbnail(data.profileImgUrl[0]);
		console.log(url);
		setLoading(false);
		const updatedData = {
			...data,
			profileImgUrl: url,
		};
		context?.handleFormData(updatedData);
		context?.handleNextStep();
	};
	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
		>
			<Input label="Name" {...register("name", { required: true })} />
			<Input label="Email" {...register("email", { required: true })} />
			<Input label="Phone" {...register("phone", { required: true })} />

			<div>
				<label
					htmlFor="career"
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					Career Objectives
				</label>
				<div className="mt-2">
					<textarea
						rows={4}
						id="career"
						placeholder="Career Objectives"
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
						{...register("career", { required: true })}
					/>
				</div>
			</div>
			<div className="rounded-md border col-span-2 border-emerald-400 bg-emerald-50 p-4 shadow-md w-52">
				<label
					htmlFor="upload"
					className="flex flex-col items-center gap-2 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 fill-white stroke-emerald-400"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span className="text-gray-600 font-medium">Upload Thumbnail</span>
				</label>
				<Input
					label=""
					id="upload"
					type="file"
					className="hidden"
					{...register("profileImgUrl", { required: true })}
				/>
			</div>
			<button
				disabled={loading}
				className="bg-emerald-400 w-1/3 disabled:cursor-wait text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
			>
				Next
			</button>
		</form>
	);
};
export default Basic;
