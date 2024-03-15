"use client";
import styles from "./Navbar.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
	const dispatch = useDispatch();
	const brandTheme = useSelector((state) => state.theme);

	return (
		<nav className={styles.nav}>
			<div
				className={styles.navWrapper}
				style={{
					backgroundColor: brandTheme.color["--background"],
					color: brandTheme.color["--foreground"],
				}}
			>
				<Link href="#" className={styles.brandLogo}>
					<Image
						src={brandTheme.logo}
						alt="logo"
						width={100}
						height={100}
					/>
					<span>{brandTheme.name}</span>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
