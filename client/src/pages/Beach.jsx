import React, { useEffect, useRef } from 'react';
import axios from 'axios';

function Beach() {
  const mirrorCanvasRef = useRef(null);

  useEffect(() => {
    const createSession = async () => {
      try {
        // Fetch the authenticated user data
        const userResponse = await axios.get('http://localhost:3000/api/user', { withCredentials: true });
        const user = userResponse.data.user;

        // Get today's date
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Post the session data to the backend
        await axios.post('http://localhost:3000/api/session', {
          user_id: user._id,
          score: 100,
          vr_minigame_name: 'Beach',
          duration: 3,
          date_played: today,
        }, { withCredentials: true });
      } catch (error) {
        console.error('Error creating session:', error);
      }
    };

    createSession();

    // Initialize WebGL and XR session
    const mirrorCanvas = mirrorCanvasRef.current;
    if (mirrorCanvas) {
      const mirrorContext = mirrorCanvas.getContext('2d');

      function onXRFrame(t, frame) {
        let session = frame.session;

        // Per-frame scene setup
        scene.startFrame();
        session.requestAnimationFrame(onXRFrame);

        // Draw the VR frame onto the mirror canvas
        if (gl && mirrorContext) {
          mirrorContext.clearRect(0, 0, mirrorCanvas.width, mirrorCanvas.height);
          mirrorContext.drawImage(gl.canvas, 0, 0, mirrorCanvas.width, mirrorCanvas.height);
        }

        // Other rendering logic...
        scene.endFrame();
      }

      // Initialize XR and WebGL context logic...
    }
  }, []);

  return (
    <div>
      <header>
        <details open>
          <summary>VR Experience & Therapy Minigames</summary>
          <p>
            A relaxing virtual experience that simulates a cartoony version of outer space, meant to be used as a calming space for people who want to relax and zone out for a bit. This space is also where the motor function therapy minigame can be played. *Please note that with the growth of Motion Minds, more virtual spaces will be added, as well as minigames and experiences meant to target various disabilities in the near future.*
          </p>
        </details>
      </header>
      <main style={{ textAlign: 'center' }}>
        <p>Click 'Enter VR' to see content</p>
        <canvas ref={mirrorCanvasRef} width="800" height="600" style={{ border: '1px solid #000' }}></canvas>
      </main>
    </div>
  );
}

export default Beach;
