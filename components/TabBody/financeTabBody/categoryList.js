import React, { useEffect, useState } from 'react';


import useInstallPrompt from '../../../utils/useInstallPrompt';

export default function CategoryList(props) {
  const { installApp, isIos, isInStandaloneMode } = useInstallPrompt();

  return (
    <div>
      <h1>Welcome to Lifestyle App</h1>
      {!isInStandaloneMode && (
        <button onClick={installApp} style={{ padding: '10px', fontSize: '16px', color: '#FFFFFF', backgroundColor: '#8936FF' }}>
          Install App
        </button>
      )}
      {isIos && !isInStandaloneMode && (
        <p style={{ fontSize: '14px', color: '#666' }}>
          Tap the Share icon below, then select "Add to Home Screen" to install the app.
        </p>
      )}
    </div>
  );
}



