/**
 * @import {Grammar} from '@wooorm/starry-night'
 * @import {PluggableList} from 'unified'
 */
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import README from "../../README.md?raw";
import { createStarryNight } from "@wooorm/starry-night";
import sourceJs from "@wooorm/starry-night/source.js"; // JavaScript
import textHtmlBasic from "@wooorm/starry-night/text.html.basic"; // HTML
import textMd from "@wooorm/starry-night/text.md"; // Markdown
import sourceShell from "@wooorm/starry-night/source.shell"; // Shell
import { MarkdownHooks } from "react-markdown";
import rehypeStarryNight from "rehype-starry-night";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

export default function About() {
  /** @type {ReadonlyArray<Grammar>} */
  const grammars = [sourceJs, sourceShell, textHtmlBasic, textMd];
  /** @type {Awaited<ReturnType<typeof createStarryNight>>} */
  let starryNight;

  createStarryNight(grammars).then(
    /**
     * @returns {undefined}
     */
    function (x) {
      starryNight = x;

      const missing = starryNight.missingScopes();
      if (missing.length > 0) {
        throw new Error("Missing scopes: `" + missing + "`");
      }
    }
  );

  /** @type {PluggableList} */
  const rehypePlugins = [rehypeRaw, rehypeSlug, rehypeStarryNight];
  /** @type {PluggableList} */
  const remarkPlugins = [remarkGfm, remarkToc];

  const renderUnorderedList = ({ ...props }) => {
    return <ul className="list-disc pl-6" {...props} />;
  };

  const renderOrderedList = ({ ...props }) => {
    return <ol className="list-decimal pl-6" {...props} />;
  };

  const components = {
    ul: renderUnorderedList,
    ol: renderOrderedList,
  };

  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden bg-neutral-900">
      <article className="px-10 py-4 markdown-body">
        <MarkdownHooks
          remarkPlugins={remarkPlugins}
          rehypePlugins={rehypePlugins}
          components={components}
        >
          {README}
        </MarkdownHooks>
      </article>
    </div>
  );
}
