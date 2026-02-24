export const defaultContent = String.raw`

\begin{document}

\title{My Cool Document}

\section*{Really Cool Math}\label{sec-cool-math}


\begin{figure}[ht]
    \centering
    \includegraphics[width=0.5\textwidth]{example.png}
    \caption{A graph of the sine and cosine functions.}
    \label{fig-sin-cos}
\end{figure}


As you can see in Figure~\ref{fig-sin-cos}, the sine and cosine functions oscillate between -1 and 1.


\end{document}
`;
