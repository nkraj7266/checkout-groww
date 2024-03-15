"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styles from "./confirmation.module.scss";
import Image from "next/image";

import cross from "@/../public/assets/images/cross.png";
import tick from "@/../public/assets/images/tick.png";
import warn from "@/../public/assets/images/warn.png";

const Confirmation = () => {
	const router = useRouter();

	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [finalPrice, setFinalPrice] = useState(0);

	// Redux
	const data = useSelector((state) => state.products.products);
	const payOption = useSelector((state) => state.products.payOption);
	const orderStatus = useSelector((state) => state.products.orderStatus);

	useEffect(() => {
		if (!data.length) {
			router.push("/checkout");
		}

		let totalPrice = 0;
		let discount = 0;
		let finalPrice = 0;
		data.forEach((item) => {
			totalPrice += item.price * item.quantity;
			discount += 0.2 * item.price * item.quantity;
		});
		setTotalPrice(totalPrice.toFixed(2));
		setDiscount(discount.toFixed(2));
		finalPrice = totalPrice - discount + (totalPrice >= 500 ? 0 : 50);
		setFinalPrice(finalPrice.toFixed(2));
	}, [data]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.row}>
					<h1 className={styles.heading}>Order Status</h1>
					<div className={styles.wrapper}>
						<div className={styles.status}>
							<Image
								src={
									orderStatus == 1
										? tick
										: orderStatus == 2
										? cross
										: warn
								}
								alt="Order status"
								width={100}
								height={100}
							/>
							<div className={styles.statusText}>
								<h2>{`Order ${
									orderStatus == 1
										? "Confirmed"
										: orderStatus == 2
										? "Failed"
										: "Pending"
								}
									`}</h2>
								{orderStatus == 1 && (
									<p>
										Your order has been confirmed and will
										be delivered soon.
									</p>
								)}
								{orderStatus == 2 && (
									<p>
										Your order has failed. Please try again.
									</p>
								)}
								{orderStatus == 3 && (
									<p>
										Please wait ! <br /> You will receive a
										confirmation email shortly.
									</p>
								)}
							</div>
						</div>
					</div>
					<div className={styles.wrapper}>
						{orderStatus == 1 && (
							<div className={styles.orderDetails}>
								<h2 className={styles.heading}>
									Order Details
								</h2>
								<div className={styles.details}>
									{payOption && payOption != 3 ? (
										<div className={styles.paymentDetails}>
											{payOption == 1 && (
												<p>
													Card No. :{" "}
													<span>123XXXXXXXXXX</span>
												</p>
											)}
											{payOption == 2 && (
												<p>
													UPI Ref No. :{" "}
													<span>123XXXXXXXXXX</span>
												</p>
											)}
											<p>
												Transaction No. :{" "}
												<span>
													T1234-5678-9012-3456
												</span>
											</p>
											<p>
												Date of Transaction :{" "}
												<span>
													{new Date().toLocaleDateString() +
														" " +
														new Date().toLocaleTimeString()}
												</span>
											</p>
										</div>
									) : (
										<div className={styles.paymentDetails}>
											<p>
												Mode of Payment :{" "}
												<span>Cash on Delivery</span>
											</p>
											<p>
												Delivery Address :{" "}
												<span>
													123, XYZ Colony, ABC City,
													123456
												</span>
											</p>
										</div>
									)}
									<div className={styles.amountDetails}>
										<div>
											<p>Total Price :</p>
											<span>Rs. {totalPrice}</span>
										</div>
										<div>
											{payOption == 3 ? (
												<p>Amount to be Paid :</p>
											) : (
												<p>Amount Paid :</p>
											)}
											<span>Rs. {finalPrice}</span>
										</div>

										<p style={{ color: "green" }}>
											! You{" "}
											{payOption == 3
												? "will save"
												: "saved"}{" "}
											<strong>Rs. {discount}</strong> on
											this order
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Confirmation;
