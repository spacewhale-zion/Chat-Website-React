import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.volume = 0.5;  // Set the volume (optional)
			sound.play().catch((error) => console.error("Audio playback failed", error)); // Handle audio playback error
			setMessages((prevMessages) => [...prevMessages, newMessage]); // Functional update to prevent stale state
		};

		socket?.on("newMessage", handleNewMessage);

		return () => socket?.off("newMessage", handleNewMessage); // Clean up listener
	}, [socket, setMessages]);

	return null;
};

export default useListenMessages;
