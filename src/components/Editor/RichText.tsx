interface RichTextProps {
  content: string;
}
export const RichText: React.FC<RichTextProps> = ({ content }) => {
  const htmlObject = {
    __html: content,
  };

  return (
    <div
      dangerouslySetInnerHTML={htmlObject}
      className={`
        
        h-[100%] w-[100%]
        overflow-y-auto
        [&>a]:text-blue-500 [&>a]:underline
        [&>h1]:text-3xl [&>h1]:font-bold
        [&>h2]:text-2xl [&>h2]:font-bold
        [&>h3]:text-xl [&>h3]:font-bold
        [&>h4]:text-lg [&>h4]:font-bold
        [&>h5]:text-base [&>h5]:font-bold
        [&>h6]:text-sm
        [&>h6]:font-bold [&>li]:text-base
        [&>ol]:ml-4 [&>ol]:list-decimal
        [&>p]:text-base
        [&>ul]:ml-4 [&>ul]:list-disc
      `}
    />
  );
};
