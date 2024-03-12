"use client";
import React from "react";
import { useState } from "react";
import styles from "./counter.module.css";

const Counter = (props) => {
	const [quantity, setQuantity] = useState(() => props.quantity);

	return (
		<div className={styles.counter}>
			<button className={styles.change}>-</button>
			<div className={styles.quantity}>
				<input type="text" />
			</div>
			<button className={styles.change}>+</button>
		</div>
	);
};

export default Counter;
