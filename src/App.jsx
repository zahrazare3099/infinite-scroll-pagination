import Header from "./components/Header";
import ShowProducts from "./ShowProducts";
import "./App.css";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen flex flex-col px-4 gap-4 pb-24">
      <Header />
      <ShowProducts />
    </div>
  );
}

export default App;
