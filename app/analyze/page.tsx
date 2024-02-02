import Link from "next/link";

import { getFPLIds } from "../utils";

const Analyze = async () => {
  const fpl_ids = await getFPLIds();

  return (
    <section className="my-4 w-full px-6 text-sm md:mx-auto md:w-4/5 md:max-w-[800px] md:text-base">
      {fpl_ids.length > 0 ? (
        <ul className="mt-2">
          {fpl_ids.map((id) => (
            <li key={id} className="flex items-center">
              <Link href={`/analyze/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <>There are no Managers.</>
      )}
    </section>
  );
};

export default Analyze;
