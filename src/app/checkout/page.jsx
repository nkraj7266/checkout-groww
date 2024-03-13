"use client";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./checkout.module.css";
import Counter from "@/components/counter/Counter";
import axios from "axios";
import Image from "next/image";

const Checkout = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetching data
	const assembleData = async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				"https://groww-intern-assignment.vercel.app/v1/api/order-details"
			);
			setData(res.data.products);
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
					<h1 className={styles.heading}>Checkout</h1>
				</div>
				<div className={styles.row}>
					<div className={styles.orderDetails}>
						<div className={styles.delivery}>
							<h2>Delivery Deatils:</h2>
							<div className={styles.address}>
								<p>15, Yamen Road, Yamen</p>
								<p>+91 6386061705</p>
							</div>
						</div>
						<div className={styles.products}>
							{loading ? (
								<p>Loading...</p>
							) : (
								data.map((item) => (
									<div
										className={styles.productCard}
										key={item.id}
									>
										<div className={styles.productInfo}>
											<div className={styles.image}>
												<img
													src={item.image}
													alt="Product Image"
													width={100}
													height={100}
												/>
											</div>
											<div className={styles.details}>
												<h2>{item.title}</h2>
												<p>{item.price}</p>
											</div>
										</div>
										<Counter quantity={item.quantity} />
									</div>
								))
							)}
						</div>
					</div>
					<div className={styles.orderSummary}>
						<div className={styles.summary}>
							<p>Lorem ipsum dolor sit amet.</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Checkout;
