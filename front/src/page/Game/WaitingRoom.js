import React, { useState } from "react";

export const WaitingRoom= () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  return (
    <div className="container">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Waiting for an opponent...</span>
        </div>
      ) : (
        <div>
          <h1>Starting game </h1>
          <p>Your game is about to start, choose your cards </p>
        </div>
      )}
    </div>
  );
}

