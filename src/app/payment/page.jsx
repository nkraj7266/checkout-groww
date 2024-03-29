"use client";
import axios from "axios";
import Image from "next/image";
import styles from "./payment.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setPayOptions, setOrderStatus } from "@/redux/slices/paymentSlice";
import { toast, toastDict } from "@/lib/toastify";

import cards from "@/../public/assets/images/cards.png";
import payment from "@/../public/assets/images/payment.png";
import truck from "@/../public/assets/images/truck.png";
import Loader from "@/components/loader/Loader";

const Payment = () => {
	const [payData, setPayData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [payOption, setPayOption] = useState(0);
	const [dataFetched, setDataFetched] = useState(false);

	// Router
	const router = useRouter();

	// Redux
	const dispatch = useDispatch();

	const handlePayOption = (option) => () => {
		if (option === payOption) {
			dispatch(setPayOptions(0));
			setPayOption(0);
			return;
		}
		setPayOption(option);
		dispatch(setPayOptions(option));
	};

	const handlePayment = () => {
		if (payOption === 0) {
			toast.warn("Please select a payment method", toastDict);
			return;
		}
		const orderStatus = 1 + Math.floor(Math.random() * 3);
		dispatch(setOrderStatus(orderStatus));
		router.push("/confirmation");
	};

	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [finalPrice, setFinalPrice] = useState(0);

	// Redux
	const data = useSelector((state) => state.products.products);

	useEffect(() => {
		if (!data.length) {
			router.push("/");
		}

		let totalPrice = 0;
		let discount = 0;
		let finalPrice = 0;
		data.forEach((item) => {
			totalPrice += item.price * item.quantity;
			discount += 0.2 * item.quantity;
		});
		setTotalPrice(totalPrice.toFixed(2));
		setDiscount(discount.toFixed(2));
		finalPrice = totalPrice - discount + (totalPrice >= 500 ? 0 : 50);
		setFinalPrice(finalPrice.toFixed(2));
	}, [data]);

	// Fetching data
	const assembleData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				"https://groww-intern-assignment.vercel.app/v1/api/order-details"
			);
			setPayData(res.data.paymentMethods);
			setDataFetched(true);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const assembleDataWrapper = async () => {
			try {
				await assembleData();
			} catch (err) {
				console.log(err);
			}
		};

		assembleDataWrapper();
	}, []);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.row}>
					<h1 className={styles.heading}>Payment</h1>
				</div>
				<div className={styles.row}>
					{loading ? (
						<div className={styles.loader}>
							<Loader />
						</div>
					) : (
						<div className={styles.paySection}>
							<h2>Choose Payments Method</h2>
							<div className={styles.payMethods}>
								{payData.includes("CARDS") && (
									<div
										className={
											payOption === 1
												? `${styles.payMethod} ${styles.active}`
												: styles.payMethod
										}
										onClick={handlePayOption(1)}
									>
										<Image
											src={cards}
											alt="Cards"
											width={50}
											height={50}
										/>
										<span>Credit/Debit Card</span>
									</div>
								)}
								{payData.includes("UPI") && (
									<div
										className={
											payOption === 2
												? `${styles.payMethod} ${styles.active}`
												: styles.payMethod
										}
										onClick={handlePayOption(2)}
									>
										<Image
											src={payment}
											alt="Payment"
											width={50}
											height={50}
										/>
										<span>UPI</span>
									</div>
								)}
								<div
									className={
										payOption === 3
											? `${styles.payMethod} ${styles.active}`
											: styles.payMethod
									}
									onClick={handlePayOption(3)}
								>
									<Image
										src={truck}
										alt="Truck"
										width={50}
										height={50}
									/>
									<span>Cash on Delivery</span>
								</div>
							</div>
						</div>
					)}
					{dataFetched && (
						<div className={styles.payDetails}>
							<h2>Payment Details</h2>
							<div className={styles.totalAmount}>
								<p>Total</p>
								<span>{`Rs. ${finalPrice}`}</span>
							</div>
							<div className={styles.payBtn}>
								{payOption === 3 ? (
									<button onClick={handlePayment}>
										Place Order
									</button>
								) : (
									<button onClick={handlePayment}>
										Make Payment
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Payment;
