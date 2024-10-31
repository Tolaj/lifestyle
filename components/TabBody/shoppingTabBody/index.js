import useInstallPrompt from 'components/extra/pwa';

export default function ShoppingTabBody() {
  const { isInstallable, installApp } = useInstallPrompt();

  return (
    <div>
      <h1>Welcome to Lifestyle App</h1>
      {isInstallable && (
        <button onClick={installApp} style={{ padding: '10px', fontSize: '16px', color: '#FFFFFF', backgroundColor: '#8936FF' }}>
          Install App
        </button>
      )}
    </div>
  );
}
