export const defaultContent = String.raw`


\begin{document}

\title{My Cool Document}

\section*{Really Cool Math}\label{sec-cool-math}

Below you'll find some really cool math.

Check it out!

\begin{enumerate}
    \item[(a)] Hi there
\item $e^2$ is math mode! \[\begin{bmatrix}12&3^e\\\pi&0\end{bmatrix}\]
\end{enumerate}

\includegraphics[width="2in"]{my-figure.pdf}

\begin{thm}
This is a theorem. It has some math in it. \[\int_0^1 x^2 dx\].  This is true in $\R^n$ for all $n$.
\end{thm}

\hint{This is a hint. It has some math in it. \[\int_0^1 x^2 dx\].  This is true in $\R^n$ for all $n$.}

\begin{hint}
This is another hint. It has some math in it. \[\int_0^1 x^2 dx\].  This is true in $\R^n$ for all $n$.
\end{hint}

\end{document}
`;
