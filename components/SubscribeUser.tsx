"use client";
import { createPaymentIntent, getUniqueUser } from "@/lib/actions/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
const SubscribeUser = () => {
	const [user, setUser] = useState<User>();
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(true);
	useEffect(() => {
		const getUser = async () => {
			const user = await getUniqueUser();
			setUser(user!);
		};
		getUser();
	}, []);
	const getClientSecret = async () => {
		try {
			setLoading(true);
			const res = await createPaymentIntent();
			if (res?.status === "success") {
				setClientSecret(res.data!);
				setOpen(true);
			}
		} catch (error) {
			toast.error("paymentIntent could not be created");
		} finally {
			setLoading(false);
		}
	};
	if (user?.subscription)
		return (
			<div className="text-emerald-400 font-bold">You are subscribed user</div>
		);
	const options: StripeElementsOptions = {
		clientSecret,
	};
	return (
		<div className="flex justify-between items-center">
			<div className="text-red-500 font-bold">
				You are not a subscribed user
			</div>
			<button
				disabled={loading}
				onClick={getClientSecret}
				className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out disabled:cursor-wait"
			>
				Subscribe Now <span className="font-bold">5$</span>
			</button>
			{clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm
						open={open}
						setOpen={setOpen}
						user={user!}
						setUser={setUser}
					/>
				</Elements>
			)}
		</div>
	);
};

export default SubscribeUser;
