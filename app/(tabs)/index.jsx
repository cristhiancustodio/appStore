import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { decimales, sumarArray } from '@/utils/helpers';
import RegistroDiario from '../../services/RegistroDia/main';

export default function Index() {
	const [total_anual, setTotalAnual] = useState(0);
	const [total_gastos, setTotalGastos] = useState(0);
	const [refreshing, setRefreshing] = useState(false);

	const extraerDatos = async () => {
		setRefreshing(true);
		let data = await RegistroDiario.obtenerMisVentasAnuales();
		if (data.error == false) {
			setTotalAnual(sumarArray(data.items, 'total_mes'));
		}

		setRefreshing(false);
	}

	useEffect(() => {

		extraerDatos();
	}, [])
	const onRefresh = () => {
		extraerDatos();
	}
	return (
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		}>
			<View className="m-2 space-y-4">
				<View className="bg-white rounded-md p-4 space-y-3">
					<View>
						<Text className="font-semibold">Ganancias totales</Text>
					</View>
					<View>
						<Text className="text-center text-3xl text-success font-semibold">S/{decimales(total_anual)}</Text>

					</View>
				</View>
				<View className="bg-white rounded-md p-4 space-y-3">
					<View>
						<Text className="font-semibold">Gastos totales</Text>
					</View>
					<View>
						<Text className="text-center text-3xl text-error font-semibold">-S/{decimales(total_gastos)}</Text>

					</View>
				</View>
			</View>
		</ScrollView>
	);
}