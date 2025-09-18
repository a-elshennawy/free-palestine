import "./App.css";
import Counter from "./Counter";
import DateDisplay from "./DateDisplay";

function App() {
  return (
    <>
      <div className="container-fluid text-center m-0 py-5">
        <DateDisplay />
        <div className="innerContent row justify-content-center align-items-center gap-4 m-0 p-0">
          <h1 className="col-12 m-0 p-0">i hate israel</h1>
          <Counter />
        </div>
      </div>
    </>
  );
}

export default App;
