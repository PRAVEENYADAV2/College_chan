// app/page.js
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [ip, setIp] = useState('');

  useEffect(() => {
    // Fetch the IP address when the component mounts
    fetch('/api/get-api')
      .then(response => response.json())
      .then(data => setIp(data.ip));
  }, []);

  return (
    <div>
      <h1>Welcome to my site!</h1>
      <p>Your IP address is: {ip}</p>
    </div>
  );
}
