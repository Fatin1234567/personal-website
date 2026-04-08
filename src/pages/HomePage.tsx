import { Link } from "react-router-dom";
import { profile } from "../data/siteContent";

export function HomePage() {
  return (
    <section className="home-layout page-fade">
      <article className="home-card">
        <div className="avatar">
          {profile.profileImageUrl ? (
            <img alt={profile.name} className="avatar-image" src={profile.profileImageUrl} />
          ) : (
            <span aria-hidden="true">{profile.initials}</span>
          )}
        </div>
        <div className="home-copy">
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <nav className="home-links" aria-label="Section links">
            <Link to="/career">Skills and career &gt;</Link>
            <Link to="/education">Education and interests &gt;</Link>
            <Link to="/blog">Blog &gt;</Link>
            <a href={profile.linkedinUrl} rel="noreferrer" target="_blank">
              LinkedIn &gt;
            </a>
          </nav>
        </div>
      </article>
    </section>
  );
}
