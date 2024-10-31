import { useState, useEffect } from 'react';

export default function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    setIsIos(isIosDevice);
    setIsInStandaloneMode(isStandalone);

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const installApp = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return { isInstallable, installApp, isIos, isInStandaloneMode };
}
