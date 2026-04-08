import { useRef } from "react";
import { careerSummary, experience, skills } from "../data/siteContent";

function renderLeadEmphasis(text: string) {
  const splitIndex = text.indexOf(". ");
  if (splitIndex <= 0) {
    return text;
  }

  const lead = text.slice(0, splitIndex + 1);
  const rest = text.slice(splitIndex + 2);

  return (
    <>
      <strong>{lead}</strong> {rest}
    </>
  );
}

export function CareerPage() {
  const skillsRef = useRef<HTMLElement | null>(null);

  return (
    <section className="page-fade page-stack career-page">
      <article className="hero-panel career-intro">
        <h1 className="section-title">Skills and career</h1>
        <p>{careerSummary}</p>
        <button
          className="ghost-btn"
          onClick={() => skillsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          type="button"
        >
          Read more
        </button>
      </article>

      <section className="skills-band" id="skills" ref={skillsRef}>
        <h2>Skills</h2>
        <p>
          <span className="skill-label">Programming</span> | {skills.programming.join(", ")}
        </p>
        <p>
          <span className="skill-label">Infrastructure</span> | {skills.infrastructure.join(", ")}
        </p>
        <p>
          <span className="skill-label">Development</span> | {skills.development.join(", ")}
        </p>
      </section>

      <section className="detail-column">
        {experience.map((role) => (
          <article className="detail-card" key={`${role.company}-${role.period}`}>
            <h2>
              {role.company} {">"} {role.title} | {role.period}
            </h2>
            {role.highlights.map((item) => (
              <p key={item}>{renderLeadEmphasis(item)}</p>
            ))}
          </article>
        ))}
      </section>
    </section>
  );
}
