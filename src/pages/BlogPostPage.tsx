import { useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { blogPosts } from "../data/siteContent";

function renderInlineCode(text: string) {
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <code key={`${part}-${index}`}>{part}</code> : part
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const articleRef = useRef<HTMLElement | null>(null);
  const post = blogPosts.find((item) => item.slug === slug) ?? null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <section className="page-fade page-stack blog-page blog-post-page">
      <article className="hero-panel hero-blog">
        <div className="blog-post-hero">
          <h1>{post.title}</h1>
          <div className="blog-post-summary">
            <p>{post.summary}</p>
          </div>
          <button
            className="ghost-btn"
            onClick={() => articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            type="button"
          >
            Read post
          </button>
        </div>
      </article>

      <article className="detail-card blog-article" ref={articleRef}>
        {post.blocks.map((block, index) => (
          <section className="blog-section" key={`${post.slug}-block-${index}`}>
            {block.heading ? <h2>{block.heading}</h2> : null}
            {block.subheading ? <h3>{block.subheading}</h3> : null}
            {block.paragraphs?.map((paragraph) => (
              <p key={`${index}-${paragraph}`}>{paragraph}</p>
            ))}
            {block.list?.length ? (
              <ul className="blog-list-square">
                {block.list.map((item) => (
                  <li key={`${index}-${item}`}>{renderInlineCode(item)}</li>
                ))}
              </ul>
            ) : null}
            {block.callout ? <div className="blog-callout">{block.callout}</div> : null}
            {block.code ? <pre className="blog-code">{block.code}</pre> : null}
          </section>
        ))}
      </article>
    </section>
  );
}
