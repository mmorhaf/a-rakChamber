import dompurify, { dirty } from "dompurify";

dompurify.addHook("uponSanitizeElement", (node, data) => {
  if (data.tagName === "iframe") {
    const src = node.getAttribute("src") || "";
    if (
      !src.startsWith("https://art19.com") &&
      !src.startsWith("https://www.youtube.com")
    ) {
      return node.parentNode?.removeChild(node);
    }
  }
});

export function unescapeHTML(html) {
  const sanitizer = dompurify.sanitize;
  var escapeEl = document.createElement("textarea");
  escapeEl.innerHTML = html;
  return sanitizer(escapeEl.textContent, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
}
