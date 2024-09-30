import patternDesktop from "./images/pattern-bg-desktop.png";

function App() {
  return (
    <main>
      <section className="flex items-center justify-center">
        <img src={patternDesktop} alt="desktop background" className="w-full" />
      </section>
    </main>
  );
}

export default App;
