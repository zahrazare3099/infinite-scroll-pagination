import Header from "./components/Header";
import ShowProducts from "./components/ShowProducts";
import "./App.css";

function App() {
  return (
    <div className="bg-slate-200  min-h-dvh flex flex-col pb-14 gap-4 px-5">
      <Header />
      <ShowProducts />
    </div>
  );
}

export default App;
