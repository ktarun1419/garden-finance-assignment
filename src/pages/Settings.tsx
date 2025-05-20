import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
  };

  return (
    <div>
      <h1>Settings</h1>
      <p>Coming soon ...</p>
      {/* <label>
        <input type="checkbox" checked={darkMode} onChange={toggle} /> Enable dark mode
      </label> */}
    </div>
  );
}
