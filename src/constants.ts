import { Environment, Macro } from "@unified-latex/unified-latex-types";
import { htmlLike } from "@unified-latex/unified-latex-util-html-like";
import { getArgsContent } from "@unified-latex/unified-latex-util-arguments";
import { printRaw } from "@unified-latex/unified-latex-util-print-raw";
import { title } from "process";


export const ptxExtraEnvironmentReplacements = {
  solution: (node: Environment) => {
    return htmlLike({
      tag: "solution",
      content: node.content,
    });
  },
  answer: (node: Environment) => {
    return htmlLike({
      tag: "answer",
      content: node.content,
    });
  },
  hint: (node: Environment) => {
    return htmlLike({
      tag: "hint",
      content: node.content,
    });
  },
  center: (node: Environment) => {
    return htmlLike({
      tag: "blockquote",
      content: htmlLike({
        tag: "p",
        content: node.content,
      }),
    });
  },
  table: (node: Environment) => {
    return htmlLike({
      tag: "table",
      content: node.content,
    });
  },
  figure: (node: Environment) => {
    return htmlLike({
      tag: "figure",
      content: node.content,
    });
  }
};

export const myMacroReplacements = {
    includegraphics: (node: Environment | Macro) => {
        const args = getArgsContent(node);
        console.log("includegraphics args", args);
        const path = printRaw(
            args[args.length - 1] || []
        ).replace(/\.pdf$/, ".png");
        return htmlLike({
            tag: "img",
            attributes: { src: path },
        });
    },
    title: (node: Environment | Macro) => {
        const args = getArgsContent(node);
        const titleText = args[args.length - 1] || [];
        console.log("title args", args);
        return htmlLike({
            tag: "title",
            content: titleText,
        });
    },
    date: (node: Environment | Macro) => {
        const args = getArgsContent(node);
        const dateText = args[args.length - 1] || [];
        console.log("date args", args);
        return htmlLike({
            tag: "date",
            content: dateText,
        });
    },
    today: (node: Environment | Macro) => {
        return htmlLike({
            tag: "today",
        });
    },
    caption: (node: Environment | Macro) => {
        const args = getArgsContent(node);
        const captionText = args[args.length - 1] || [];
        console.log("caption args", args);
        return htmlLike({
            tag: "caption",
            content: captionText,
        });
    }
}
