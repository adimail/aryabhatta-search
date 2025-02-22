export const LLMReact = ({ summary }: { summary: any }) => {
    return <p className="">{summary ? summary.choices[0]?.message.content : ""}</p>;
};
