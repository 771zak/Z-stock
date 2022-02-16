import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoScreen = ()=>{
	return (
		<View style={styles.container}>
			<Text>hello from info</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default InfoScreen;
