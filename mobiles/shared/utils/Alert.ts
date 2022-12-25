import { Alert, AlertButton, AlertOptions, Platform } from "react-native";

// https://github.com/necolas/react-native-web/issues/1026
const webAlert = (
	title: string,
	description?: string,
	buttons?: AlertButton[]
) => {
	if (buttons === undefined || buttons.length === 0) {
		window.alert([title, description].filter(Boolean).join("\n"));
		return;
	}

	const result = window.confirm(
		[title, description].filter(Boolean).join("\n")
	);

	if (result) {
		const confirmOption = buttons.find(({ style }) => style !== "cancel");
		confirmOption?.onPress?.();
	} else {
		const cancelOption = buttons.find(({ style }) => style === "cancel");
		cancelOption?.onPress?.();
	}
};

const alert = Platform.OS === "web" ? webAlert : Alert.alert;

export default alert;
