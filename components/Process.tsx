import { steps } from "@/lib/content";
import Lines from "./Lines";

export default function Process() {
  return (
    <section id="process" aria-label="Process">
      <div className="wrap sec-head">
        <span className="label">(05) Process</span>
        <Lines as="h2" className="display h-l" lines={["Idea first.", <>Pixels <em className="it">last.</em></>]} />
        <p className="rv">The same four steps whether it is a logotype, a festive post due tomorrow morning or a 16-second product video.</p>
      </div>
      <div className="wrap">
        <ol className="process">
          {steps.map((s, i) => (
            <li className="step rv" key={s.t} style={{ ["--d" as string]: i }}>
              <span className="step__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
