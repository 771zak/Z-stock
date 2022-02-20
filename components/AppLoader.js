import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default class AppLoader extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<LottieView source={require('../assets/loader.json')} autoPlay loop />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#fff"
	}
})

