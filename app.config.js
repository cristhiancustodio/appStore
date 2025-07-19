import "dotenv/config";
export default{
	"expo": {
		"name": "appStore",
		"slug": "appStore",
		"version": "1.0.0",
		"orientation": "portrait",
		"icon": "./assets/images/icon.png",
		"scheme": "appstore",
		"userInterfaceStyle": "automatic",
		"newArchEnabled": true,
		"ios": {
			"supportsTablet": true
		},
		"android": {
			"adaptiveIcon": {
				"foregroundImage": "./assets/images/adaptive-icon.png",
				"backgroundColor": "#ffffff"
			},
			"edgeToEdgeEnabled": true
		},
		"web": {
			"bundler": "metro",
			"output": "static",
			"favicon": "./assets/images/favicon.png"
		},
		"plugins": [
			"expo-router",
			[
				"expo-splash-screen",
				{
					"image": "./assets/images/splash-icon.png",
					"imageWidth": 200,
					"resizeMode": "contain",
					"backgroundColor": "#ffffff"
				}
			]
		],
		"experiments": {
			"typedRoutes": true
		},
		"crede_firebase": {
			"apiKey": process.env.api_key,
			"authDomain": process.env.auth_domain,
			"databaseURL": process.env.database_URL,
			"projectId": process.env.project_id,
			"storageBucket": process.env.storage_bucket,
			"messagingSenderId": process.env.messaging_sender_id,
			"appId": process.env.app_id,
			"measurementId": process.env.measurement_id
		},
	}
}