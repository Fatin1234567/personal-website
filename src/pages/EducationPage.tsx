import { useRef } from "react";
import { education, interests } from "../data/siteContent";

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

export function EducationPage() {
  const detailsRef = useRef<HTMLElement | null>(null);
  const [detailOne = "", detailTwo = "", detailThree = ""] = education.details;

  return (
    <section className="page-fade page-stack education-page">
      <article className="hero-panel hero-education education-intro">
        <h1 className="section-title">Education and interests</h1>
        <p>{education.summary}</p>
        <button
          className="ghost-btn"
          onClick={() => detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          type="button"
        >
          Read more
        </button>
      </article>

      <section className="detail-column" ref={detailsRef}>
        <article className="detail-card">
          <h2>
            {education.degree}
            <br />
            {education.institution} {education.period}
          </h2>
          <p>{renderLeadEmphasis(detailOne)}</p>
          <p>{renderLeadEmphasis(detailTwo)}</p>
          <p>{renderLeadEmphasis(detailThree)}</p>
        </article>

        <article className="detail-card">
          <h2>Interests</h2>
          <ul className="interest-list">
            {interests.map((interest) => (
              <li key={interest.title}>
                <span className="interest-label">{interest.title}</span> - {interest.description}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
