import React, {useState} from 'react';
import {
	Text,
	View,
	StyleSheet
} from "react-native";

const ProductCard = (props) => {

	return (
		<View style={styles.productCard}>
			<Text>{props.name}</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	productCard: {
		width: 150,
		height: 120,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 10,
		elevation: 2,
	}
})

export default ProductCard;
