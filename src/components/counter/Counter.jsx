"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "@/redux/slices/productsSlice";
import styles from "./counter.module.scss";

const Counter = (props) => {
	const dispatch = useDispatch();
	const [productData, setProductData] = useState(() => props.productData);
	const [equalToOne, setEqualToOne] = useState(false);

	const quantity = productData.quantity;
	const id = productData.id;

	useEffect(() => {
		if (quantity === 1) {
			setEqualToOne(true);
		} else {
			setEqualToOne(false);
		}
	}, [quantity]);

	const handleIncrement = () => {
		const newQuantity = quantity + 1;
		setProductData({ ...productData, quantity: newQuantity });
		dispatch(updateQuantity({ id, quantity: newQuantity }));
	};

	const handleQuantityChange = (value) => {
		if (value === "") {
			setProductData({ ...productData, quantity: 1 });
			dispatch(updateQuantity({ id, quantity: 1 }));
		} else if (value >= 1) {
			const newQuantity = Number(value);
			setProductData({ ...productData, quantity: newQuantity });
			dispatch(updateQuantity({ id, quantity: newQuantity }));
		}
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setProductData({ ...productData, quantity: newQuantity });
			dispatch(updateQuantity({ id, quantity: newQuantity }));
		}
	};

	return (
		<div className={styles.counter}>
			<button
				className={styles.change}
				onClick={() => handleDecrement()}
				disabled={equalToOne}
			>
				-
			</button>
			<div className={styles.quantity}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						type="text"
						value={quantity}
						onChange={(e) => handleQuantityChange(e.target.value)}
					/>
				</form>
			</div>
			<button className={styles.change} onClick={() => handleIncrement()}>
				+
			</button>
		</div>
	);
};

export default Counter;
