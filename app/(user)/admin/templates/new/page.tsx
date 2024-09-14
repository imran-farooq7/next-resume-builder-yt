import TemplateForm from "@/components/TemplateForm";
import React from "react";

const NewTemplatePage = () => {
	return (
		<div>
			<h1 className="text-2xl text-emerald-400 font-bold text-center">
				New Template
			</h1>
			<TemplateForm />
		</div>
	);
};

export default NewTemplatePage;
