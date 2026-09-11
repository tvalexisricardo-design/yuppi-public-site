export function BlogArticleContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg mt-10 max-w-none
        [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:leading-snug [&>h2]:text-ink
        [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-ink
        [&>p]:mb-5 [&>p]:leading-relaxed [&>p]:text-inkSoft
        [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-inkSoft
        [&>ol]:mb-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-inkSoft
        [&_li]:mb-2 [&_li]:leading-relaxed
        [&>blockquote]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-violet-light [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-inkSoft
        [&_a]:text-violet [&_a]:no-underline hover:[&_a]:underline
        [&_strong]:text-ink [&_strong]:font-semibold
        [&>hr]:my-10 [&>hr]:border-black/10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
