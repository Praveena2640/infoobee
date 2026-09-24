const fs = require('fs');
let c = fs.readFileSync('src/context/AppContext.jsx', 'utf8');
c = c.replaceAll("')", "`)\n"); 
c = c.replaceAll("', {\n", "`, {\n");
c = c.replaceAll("'\n      ]);", "`\n      ]);"); // For the last fetch in Promise.all
c = c.replaceAll("')", "`)"); // catch any others

// Let's just use regex to fix the trailing quote for fetch calls
let c2 = fs.readFileSync('src/context/AppContext.jsx', 'utf8');
c2 = c2.replace(/fetch\(`\$\{API_URL\}\/api\/([^']+)'/g, "fetch(`${API_URL}/api/$1`");
fs.writeFileSync('src/context/AppContext.jsx', c2);
console.log("Fixed syntax");
