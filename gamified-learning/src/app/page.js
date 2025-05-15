
import { Clock, Timer } from "@/components/clock";

export default function Home() {
  return (
    <div>
      <div className="py-2">
        <h1 className="text-4xl  py-1">Gamified Learning</h1>
        <h2 className="text-2xl font-thin font-mono">@ProfSchimd</h2>
      </div>
      <main>
        Studia, gioca impara.
        <div>
          <Clock></Clock>
          <Timer></Timer>
        </div>
      </main>
    </div>
  );
}
