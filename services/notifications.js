import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
//import * as Permissions from 'expo-permissions';


// Configurar comportamiento de las notificaciones (opcional)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('No se pudo obtener permisos para las notificaciones!');
            return;
        }

        // Obtener el token de Expo para enviar notificaciones push
        token = (await Notifications.getExpoPushTokenAsync()).data;
        
        console.log('Token de notificación:', token);
    } else {
        alert('Debes usar un dispositivo físico para recibir notificaciones.');
    }

    return token;
}
