"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/redux/slices/productsSlice";
import { addMethods } from "@/redux/slices/paymentSlice";
import { setColor, setLogo, setName } from "@/redux/slices/themeSlice";
import styles from "./checkout.module.scss";

import Counter from "@/components/counter/Counter";
import Loader from "@/components/loader/Loader";
import Nothing from "@/../public/assets/images/nothing.svg";

const Checkout = () => {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.products.products);
	const theme = useSelector((state) => state.theme);

	const [loading, setLoading] = useState(false);
	const [dataFetched, setDataFetched] = useState(false);

	const [totalPrice, setTotalPrice] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [finalPrice, setFinalPrice] = useState(0);

	const assembleData = async () => {
		setLoading(true);
		try {
			await axios
				.get(
					"https://groww-intern-assignment.vercel.app/v1/api/order-details"
				)
				.then((res) => {
					dispatch(addProduct(res.data.products));
					dispatch(addMethods(res.data.paymentMethods));
				});
			await axios
				.get(
					"https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata"
				)
				.then((res) => {
					dispatch(setLogo(res.data.merchantLogo));
					dispatch(setName(res.data.merchantName));
					dispatch(setColor(res.data.theme));
				});
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
			} catch (error) {
				console.log(error);
			}
		};

		assembleDataWrapper();
	}, [dispatch]);

	useEffect(() => {
		if (data?.length) {
			setDataFetched(true);
		}

		let totalPrice = 0;
		let discount = 0;
		let finalPrice = 0;
		data?.forEach((item) => {
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
					<h1 className={styles.heading}>Checkout</h1>
				</div>
				<div className={styles.row}>
					<div className={styles.orderDetails}>
						<div className={styles.delivery}>
							<h2>Delivery Deatils</h2>
							<div className={styles.address}>
								<p>
									<span>Address: </span>15, Yamen Road, Yamen
								</p>
								<p>
									<span>Mobile No.: </span>+91 63XXXXXX00
								</p>
							</div>
						</div>
						{dataFetched ? (
							<div className={styles.products}>
								{loading ? (
									<div className={styles.loader}>
										<Loader />
									</div>
								) : (
									data?.map((item) => (
										<div
											className={styles.productCard}
											key={item.id}
										>
											<div className={styles.productInfo}>
												<div className={styles.image}>
													<Image
														src={item.image}
														alt="Product Image"
														width={100}
														height={100}
													/>
												</div>
												<div className={styles.details}>
													<h3>{item.title}</h3>
													<p>Rs. {item.price}</p>
												</div>
											</div>
											<Counter
												productData={{
													quantity: item.quantity,
													id: item.id,
												}}
											/>
										</div>
									))
								)}
							</div>
						) : (
							<div className={styles.placeHolder}>
								<Image
									src={Nothing}
									alt="Nothing to show"
									width={300}
									height={300}
									style={{ width: "300px", height: "auto" }}
								/>
								<h4>Nothing Here Go and Add Something !</h4>
							</div>
						)}
					</div>
					{dataFetched && (
						<div className={styles.orderSummary}>
							<div className={styles.summary}>
								<h2>Price Details</h2>
								<div className={styles.priceInfo}>
									<div className={styles.priceRow}>
										<p>
											{`Price (${data.length} ${
												data.length > 1
													? "items"
													: "item"
											})`}
										</p>
										<p>{`Rs. ${totalPrice}`}</p>
									</div>
									<div className={styles.priceRow}>
										<p>Delivery Charges</p>
										<p>
											{totalPrice >= 500 ? (
												<React.Fragment>
													<span
														className={styles.free}
													>
														Rs. 50
													</span>{" "}
													Free
												</React.Fragment>
											) : (
												"Rs. 50"
											)}
										</p>
									</div>
									<div className={styles.priceRow}>
										<p>Discount</p>
										<p>{`- Rs. ${discount}`}</p>
									</div>
								</div>
							</div>

							<div className={styles.finalPrice}>
								<div>
									<p>Total Amount</p>
									<span>{`Rs. ${finalPrice}`}</span>
								</div>
								<div>
									<Link href="/payment">
										<button
											className={styles.checkoutButton}
										>
											Payment
										</button>
									</Link>
								</div>
							</div>
						</div>
					)}
					{dataFetched && (
						<div className={styles.finalPriceMob}>
							<div>
								<p>Total Amount</p>
								<span>{`Rs. ${finalPrice}`}</span>
							</div>
							<div>
								<Link href="/payment">
									<button className={styles.checkoutButton}>
										Payment
									</button>
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Checkout;
