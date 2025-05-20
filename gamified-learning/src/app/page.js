import { Games } from "@/config/games";
import { Utils } from "@/config/util";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="py-2">
        <h1 className="text-4xl  py-1">Gamified Learning</h1>
        <h2 className="text-2xl font-thin">@ProfSchimd</h2>
      </div>
      <main>
        Studia, gioca impara.
        <div>
          <h2 className="text-lg">Games</h2>
          <ul>
            {[...Games].map((game) => (
              <li className="py-1 ml-2" key={game.name}><Link className="text-sky-800 dark:text-sky-300 hover:text-sky-500" href={game.relPath}>{game.name}</Link> - {game.description}</li>
            ))}
          </ul>
          <h2 className="text-lg">Utils</h2>
          <ul>
          {[...Utils.map((util) => (
            <li className="py-1 ml-2" key={util.name}><Link className="text-sky-900 dark:text-sky-300 hover:text-sky-500" href={util.relPath}>{util.name}</Link> - {util.description}</li>
          ))]}
          </ul>
        </div>
      </main>
    </div>
  );
}
