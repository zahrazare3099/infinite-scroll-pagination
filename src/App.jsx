import Header from "./components/Header";
import Products from "./components/Products";
import "./App.css";

function App() {
  return (
    <div className="bg-slate-200  min-h-dvh flex flex-col pb-14 gap-4 px-5">
      <Header />
      <Products />
    </div>
  );
}

export default App;
