import { Link } from 'react-router-dom';
import { ArticleProps } from '../../types/articles';

interface ArticleListProps {
  article: ArticleProps;
}

export default function ArticleList({ article }: ArticleListProps) {
  console.log(article);

  return (
    <div className="py-6 border-t">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/`}>
            <img
              className="rounded-full h-8 w-8"
              src={article?.author?.profile_image}
              alt="profile_image"
            />
          </Link>
          <div className="flex flex-col ml-[0.3rem] mr-6">
            <Link
              className="text-[#5CB85C] font-medium hover:text-[#3d8b3d] hover:underline"
              to={`/`}
            >
              {article?.author?.username}
            </Link>
            <span className="text-xs text-[#bbb]">{article?.created_at}</span>
          </div>
        </div>
        <button className="text-[#5CB85C] text-sm py-1 px-2 border border-[#5CB85C] rounded hover:text-white hover:bg-[#5CB85C]">
          <i>♥︎</i>
          {article?.favorite_count}
        </button>
      </div>
      <div className="mb-[15px] cursor-pointer">
        <h1 className="text-2xl font-semibold mb-[3px]">{article?.title}</h1>
        <p className="text-[#999] font-light">{article?.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-[#bbb] text-xs cursor-pointer">Read more...</span>
        <ul className="flex cursor-pointer gap-[3px] font-light text-xs">
          {article?.tag_list?.map((tag, index) => (
            <li
              key={index}
              className="border border-[#ddd] text-[#aaa] rounded-full px-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
