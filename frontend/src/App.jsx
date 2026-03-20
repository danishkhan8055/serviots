import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <AppRouter />
    </div>
  );
};

export default App;
