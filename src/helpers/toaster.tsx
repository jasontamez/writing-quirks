import { ToastButton, ToastOptions } from "@ionic/react"
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions"

interface Toast {
	color?: string
	message: string
	buttons?: ToastButton[]
	duration?: number
	position?: "top" | "middle" | "bottom"
	doToast: {
		(message: string, duration?: number | undefined): Promise<void>;
		(options: ToastOptions & HookOverlayOptions): Promise<void>;
	}
	undoToast: () => Promise<void>
}

const toaster = (props: Toast) => {
	const {
		color = "primary",
		message,
		duration = 5000,
		doToast,
		undoToast,
		position,
		buttons = [
			{
				text: "Ok",
				role: 'cancel'
			}
		]
	} = props;
	undoToast().then(() => doToast({
		message,
		duration,
		position,
		color,
		buttons
	}));
};

export default toaster;
