import { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import { useAuth } from '../../contexts/AuthContext';
import { cls } from '../../utils/util';

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const token = localStorage.getItem('authToken');
  const [tabSelected, setTabSelected] = useState<'global' | 'your'>('global');
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  console.log(articles);

  useEffect(() => {
    setTabSelected(isLoggedIn ? 'your' : 'global');
  }, [isLoggedIn]);

  const fetchArticles = async (tab: 'global' | 'your') => {
    setTabSelected(tab);
    const endpoint = tab === 'global' ? '/articles' : ``;
    let headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `${token as any}`;
    }

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

  // Fetch global articles on component mount
  useEffect(() => {
    fetchArticles(tabSelected);
  }, [tabSelected]);

  return (
    <>
      {!isLoggedIn && <Banner />}
      <div className="page mt-6">
        <div className="flex relative">
          <div className="max-w-[75%] flex-shrink-0 flex-grow-0 w-full px-[15px]">
            <ul className="flex border-b -mb-[1px]">
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

            <div className="py-6">Loading Articles...</div>
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
    </>
  );
}
