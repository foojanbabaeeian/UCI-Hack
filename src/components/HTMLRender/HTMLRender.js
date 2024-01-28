import React from 'react';

const HTMLRenderer = () => {
  return (
    <div>
      {/* Assuming your HTML file is named example.html */}
      <iframe title="main" src="/main.html" width="100%" height="500px"></iframe>
    </div>
  );
};

export default HTMLRenderer;