export default async function Page() {
  return (
    <div className="grid">
      <div className="illustration">
        <img src="images/illustration.png" alt="" />
      </div>

      <div className="logo">
        <img
          className="logo-full"
          src="images/logo_rgb.svg"
          alt="TankeArena för Kultur"
        />
        <img className="logo-symbol" src="images/symbol_rgb.svg" alt="" />
      </div>

      <div className="text">
        <p>
          TAK är en ny tankearena för kultur som ska stärka kulturens roll i
          samhället. Verksamheten är under uppbyggnad och ligger hos{" "}
          <a
            href="https://www.iffs.se/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>Institutet för framtidsstudier</em>
          </a>{" "}
          i Stockholm.
        </p>
        <p>
          TAK är initierat och drivs av Magdalena Malm. För mer information om
          oss{" "}
          <a
            href="mailto:mm@tankearenaforkultur.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>skicka ett mail</em>
          </a>{" "}
          eller följ oss på{" "}
          <a
            href="https://www.instagram.com/tankearenaforkultur/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>Instagram</em>
          </a>
          .
        </p>
      </div>
    </div>
  );
}
