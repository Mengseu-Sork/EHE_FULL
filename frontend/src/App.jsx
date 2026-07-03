import { BrowserRouter } from "react-router-dom";

import ScrollToTop from "./website/components/ScrollToTop";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;