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
			console.log(res);
			setData(res.products);
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
							<h2>Delivery Deatils</h2>
							<div className={styles.address}>
								<p> 15, Yamen Road, Yamen</p>
							</div>
						</div>
						<div className={styles.products}>
							<div className={styles.productCard}>
								<div className={styles.productInfo}>
									<div className={styles.image}>
										<img
											src="https://dummyimage.com/100x100/000/fff"
											alt="Product Image"
										/>
									</div>
									<div className={styles.details}>
										<h2>Product Name</h2>
										<p>Product Price</p>
									</div>
								</div>
								<Counter />
							</div>
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
