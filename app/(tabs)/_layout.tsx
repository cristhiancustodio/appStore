import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Home } from 'lucide-react-native';

export default function TabLayout() {
	//const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				//tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: true,
				//tabBarButton: HapticTab,
				tabBarActiveTintColor: '#0A84FF',
				tabBarStyle: styles.tabBar,
				tabBarLabelStyle: styles.tabBarLabel
			}}>
			<Tabs.Screen
                name="index"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color }) => <Home/>,
                }}
            />
            <Tabs.Screen
                name="registerIA"
                options={{
                    title: 'IA',
                    //tabBarIcon: ({ color }) => <IconAdd fill={color} />,
                }}
            />

		</Tabs>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1FB04F',
	},
	tabBar: {
		backgroundColor: '#FFFFFF',
		margin: 10,
		borderRadius: 20
	},
	tabBarLabel: {
		fontSize: 10,
		fontWeight: '600',
	}
});