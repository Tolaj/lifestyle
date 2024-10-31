import useInstallPrompt from 'components/extra/pwa';


export default function ShoppingTabBody() {
  const { isInstallable, installApp, isIos, isInStandaloneMode } = useInstallPrompt();

  return (
    <div>
      <h1>Welcome to Lifestyle App</h1>
      {isIos && !isInStandaloneMode && (
        <div>
          <p>To install this app on your iPhone, tap the <strong>Share</strong> icon and then select <strong>Add to Home Screen</strong>.</p>
        </div>
      )}
      {!isIos && isInstallable && (
        <button onClick={installApp} style={{ padding: '10px', fontSize: '16px', color: '#FFFFFF', backgroundColor: '#8936FF' }}>
          Install App
        </button>
      )}
    </div>
  );
}

