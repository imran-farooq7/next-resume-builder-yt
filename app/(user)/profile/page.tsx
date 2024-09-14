"use client";
import Basic from "@/components/Basic";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import SubscribeUser from "@/components/SubscribeUser";
import { useFormContext } from "@/context/FormContext";

const ProfilePage = () => {
	let content = null;
	const context = useFormContext();
	if (context?.step === 0) {
		content = <Basic />;
	}
	if (context?.step === 1) {
		content = <Education />;
	}
	if (context?.step === 2) {
		content = <Skills />;
	}
	if (context?.step === 3) {
		content = <Experience />;
	}
	return (
		<div className="mt-10">
			<SubscribeUser />
			<h1 className="text-3xl font-bold text-emerald-400 mt-4">Profile</h1>
			<div className="flex gap-20 mt-8">
				<p
					className={`font-bold text-2xl ${
						context?.step === 0 && "text-emerald-400"
					}`}
				>
					Basics
				</p>
				<p
					className={`font-bold text-2xl ${
						context?.step === 1 && "text-emerald-400"
					}`}
				>
					Education
				</p>
				<p
					className={`font-bold text-2xl ${
						context?.step === 2 && "text-emerald-400"
					}`}
				>
					Skills
				</p>

				<p
					className={`font-bold text-2xl ${
						context?.step === 3 && "text-emerald-400"
					}`}
				>
					Experience
				</p>
			</div>
			<div className="mt-10">{content}</div>
		</div>
	);
};

export default ProfilePage;
