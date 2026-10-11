import sanitizeHtml from "sanitize-html";

// Isi artikel blog ditulis sebagai HTML oleh admin/penulis lalu dirender dengan dangerouslySetInnerHTML.
// Tanpa sanitasi, penulis bisa menyisipkan <script>/onerror yang berjalan di browser admin (XSS).
export function sanitizeBlogHtml(html: string | null | undefined): string {
  return sanitizeHtml(html || "", {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "h1", "h2"],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["id"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }),
    },
  });
}
