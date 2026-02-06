import React from "react";

import { formatPretext } from "@pretextbook/format";



//import "./latex-html.css";

import { useCodeMirror } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { useStoreState } from "../store/hooks";

export function PretextSourceDisplay() {
    const editorRef = React.useRef<HTMLDivElement>(null);
    const pretextInput = useStoreState((state) => state.pretext);
    const formattedHtml = React.useMemo(() => {
        try {
            return formatPretext(pretextInput, {
                breakLines: "few",
                insertSpaces: true,
                tabSize: 2,
                breakSentences: true,
            });
        } catch {
            return pretextInput;
        }
    }, [pretextInput]);

    useCodeMirror({
        container: editorRef.current,
        value: formattedHtml,
        extensions: [html()],
        readOnly: true,
        height: "100%",
        basicSetup: {
            lineNumbers: false,
            foldGutter: true,
            highlightActiveLine: false,
        },
    });

    return (
        <div
            style={{ flex: "1 1 auto", height: "100%", width: "100%"}}
            ref={editorRef}
        />
    );
}


export function PretextView({ pretextInput, ...rest }: { pretextInput: string }) {
    return (
            <div className="code-container">
                <PretextSourceDisplay />
            </div>
    );
}
