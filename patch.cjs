const fs = require('fs');
let c = fs.readFileSync('src/context/AppContext.jsx', 'utf8');

if (!c.includes('Bypass-Tunnel-Reminder')) {
  // Replace io() call
  c = c.replace(
    "const socket = io(API_URL || undefined);",
    "const socket = io(API_URL || undefined, { extraHeaders: { 'Bypass-Tunnel-Reminder': 'true' } });"
  );
  
  // Create a global fetch override at the top inside AppProvider
  c = c.replace(
    "const [inventory, setInventory] = useState([]);",
    `
  // Bypass localtunnel warning globally
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = function() {
      let [resource, config] = arguments;
      if (!config) config = {};
      if (!config.headers) config.headers = {};
      config.headers['Bypass-Tunnel-Reminder'] = 'true';
      return originalFetch(resource, config);
    };
  }, []);

  const [inventory, setInventory] = useState([]);`
  );
  
  fs.writeFileSync('src/context/AppContext.jsx', c);
  console.log("Patched!");
}
