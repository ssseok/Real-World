import { useState } from 'react';
import Banner from '../../components/Banner';
import { useAuth } from '../../contexts/AuthContext';
import { cls } from '../../utils/util';

export default function HomePage() {
  const { isLoggedIn } = useAuth();
  const [tabSelected, setTabSelected] = useState<'global' | 'your'>(
    isLoggedIn ? 'your' : 'global',
  );

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
