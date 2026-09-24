const fs = require('fs');
let content = fs.readFileSync('src/context/AppContext.jsx', 'utf8');

if (!content.includes('const API_URL')) {
  content = content.replace(
    "export const AppProvider = ({ children }) => {",
    "const API_URL = import.meta.env.VITE_API_URL || '';\n\nexport const AppProvider = ({ children }) => {"
  );
  content = content.replaceAll("fetch('/api/", "fetch(`${API_URL}/api/");
  content = content.replaceAll("fetch(`/api/", "fetch(`${API_URL}/api/");
  content = content.replace("const socket = io();", "const socket = io(API_URL || undefined);");
  fs.writeFileSync('src/context/AppContext.jsx', content);
  console.log("AppContext.jsx updated successfully!");
} else {
  console.log("AppContext.jsx already updated.");
}
