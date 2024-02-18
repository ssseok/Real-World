import { useLocation } from 'react-router-dom';

export default function ArticleBody() {
  const { state } = useLocation();

  return (
    <div className="page">
      <div className="flex flex-col">
        <p className="mb-8 text-xl">{state?.body}</p>
        <p className="mb-8 text-xl">{state?.description}</p>
        <ul className="flex cursor-pointer gap-[3px] font-light text-xs mb-4">
          {state?.tag_list?.map((tag: any, index: any) => (
            <li
              key={index}
              className="border border-[#ddd] text-[#aaa] rounded-full px-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-4" />
    </div>
  );
}
