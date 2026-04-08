import { Link } from "react-router-dom";
import { blogPosts } from "../data/siteContent";

export function BlogPage() {
  return (
    <section className="page-fade page-stack blog-page">
      <article className="hero-panel hero-blog">
        <div className="blog-panel-inner">
          <h1>Blog</h1>
          <ul className="blog-list">
            {blogPosts.map((post) => (
              <li key={post.slug}>
                <Link className="blog-tile" to={`/blog/${post.slug}`}>
                  {post.title} &gt;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
