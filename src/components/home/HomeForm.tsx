import { useEffect, useState } from 'react';
import { cls } from '../../utils/util';
import { useAuth } from '../../contexts/AuthContext';
import ArticleList from './ArticleList';
import { ArticleProps } from '../../types/articles';

export default function HomeForm() {
  const { isLoggedIn, user } = useAuth();

  const [tabSelected, setTabSelected] = useState<'global' | 'your'>('your');
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  console.log(articles);

  useEffect(() => {
    // 로그인 상태이고 user_id가 있을 때만 'your' 피드를 가져옵니다.
    if (isLoggedIn && user?.user_id) {
      fetchArticles(tabSelected);
    } else if (!isLoggedIn) {
      // 로그인하지 않은 경우에는 'global' 피드를 가져옵니다.
      fetchArticles('global');
    }
    // isLoggedIn 또는 user?.user_id가 변경될 때마다 이 useEffect를 재실행합니다.
  }, [isLoggedIn, user?.user_id, tabSelected]);

  const fetchArticles = async (tab: 'global' | 'your') => {
    // 'your' 탭을 선택했지만, user_id가 정의되지 않은 경우 함수를 종료합니다.
    if (tab === 'your' && !user?.user_id) {
      console.error('User ID is undefined.');
      return;
    }
    setTabSelected(tab);
    const endpoint =
      tab === 'global' ? '/articles' : `/user/${user?.user_id}/articles`;
    const token = localStorage.getItem('authToken');
    const headers: HeadersInit = token ? { authorization: `${token}` } : {};

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${tab} articles: ${response.statusText}`,
        );
      }

      const { articles } = await response.json();
      setArticles(articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles(tabSelected);
  }, [tabSelected]);

  return (
    <div className="page mt-6">
      <div className="flex relative">
        <div className="max-w-[75%] flex-shrink-0 flex-grow-0 w-full px-[15px]">
          <ul className="flex -mb-[1px]">
            {isLoggedIn && (
              <li
                onClick={() => setTabSelected('your')}
                className={cls(
                  'px-4 py-2 cursor-pointer text-[#aaa]',
                  tabSelected === 'your'
                    ? 'text-[#5CB85C] border-b-2 border-[#5CB85C]'
                    : '',
                )}
              >
                Your Feed
              </li>
            )}
            <li
              onClick={() => setTabSelected('global')}
              className={cls(
                'px-4 py-2 cursor-pointer text-[#aaa]',
                tabSelected === 'global'
                  ? 'text-[#5CB85C] border-b-2 border-[#5CB85C]'
                  : '',
              )}
            >
              Global Feed
            </li>
          </ul>

          {articles.length ? (
            articles?.map((article) => (
              <ArticleList article={article} key={article?.article_id} />
            ))
          ) : (
            <div className="py-6">Loading Articles...</div>
          )}
        </div>
        <div className="max-w-[25%] flex-shrink-0 flex-grow-0 w-full px-[15px]">
          <div className="pt-[5px] px-[10px] pb-[10px] bg-[#f3f3f3] rounded">
            <p className="mb-1">Popular Tags</p>
            <div>
              <div>Loading Tags...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
