import { Link } from 'react-router-dom';
import { ArticleProps } from '../../types/articles';
import UserInfo from '../UserInfo';

interface ArticleListProps {
  article: ArticleProps;
}

export default function ArticleList({ article }: ArticleListProps) {
  console.log(article);

  return (
    <div className="py-6 border-t">
      <div className="flex justify-between items-center mb-4">
        <UserInfo
          username={article?.author?.username}
          created_at={article?.created_at}
          profile_image={article?.author?.profile_image}
        />
        <button className="text-[#5CB85C] text-sm py-1 px-2 border border-[#5CB85C] rounded hover:text-white hover:bg-[#5CB85C]">
          <i>♥︎</i>
          {article?.favorite_count}
        </button>
      </div>
      <Link
        to={`/article/${article?.title}-${article?.article_id}`}
        state={article}
      >
        <div className="mb-[15px] cursor-pointer">
          <h1 className="text-2xl font-semibold mb-[3px]">{article?.title}</h1>
          <p className="text-[#999] font-light">{article?.description}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#bbb] text-xs cursor-pointer">
            Read more...
          </span>
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
      </Link>
    </div>
  );
}
