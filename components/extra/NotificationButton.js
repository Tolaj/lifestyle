import { useEffect } from 'react';

export default function NotificationButton() {
  useEffect(() => {
    if (typeof window !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const handleNotification = () => {
    if (Notification.permission === 'granted') {
      const notification = new Notification("Example notification", {
        body: "This is more text",
        data: { hello: "world" },
        icon: "/public/Logo Centered.png",
      });

      notification.addEventListener("error", e => {
        alert("An error occurred with the notification.");
      });
    } else {
      alert("Hey.");
    }
  };

  return (
    <button 
      onClick={handleNotification}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Show Notification
    </button>
  );
}
