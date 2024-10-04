import patternDesktop from "./images/pattern-bg-desktop.png";

function App() {
  return (
    <main>
      <section className="relative overflow-hidden bg-gray-400">
        <img
          src={patternDesktop}
          alt="desktop background"
          className="absolute top-0 left-0"
        />
        <h1>Track IP</h1>
      </section>
    </main>
  );
}

export default App;
