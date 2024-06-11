import "./index.css";
function App() {
  const theme = ["orange"];
  return (
    <div className={`App theme-${theme}`}>
      <header className="text-primary text-center text-5xl gray-light">
        HELLO WORD
      </header>
    </div>
  );
}

export default App;
