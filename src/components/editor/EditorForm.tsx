import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditorForm() {
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  console.log(user?.user_id, token);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const onSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/user/${user?.user_id}/article`,
        {
          method: 'POST',
          headers: {
            authorization: token as any,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body,
            description,
            tag_list: tagList,
            title,
          }),
        },
      );
      if (response.ok) {
        const result = await response.json();
        navigate(`/article/${result?.article?.article_id}`);
      }
    } catch (error: any) {
      console.error('Editor 작성 에러', error);
    }
  };
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'body') {
      setBody(value);
    }
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newTag = e.currentTarget.value.trim();
      if (newTag && !tagList.includes(newTag)) {
        setTagList((prev) => [...prev, newTag]);
        e.currentTarget.value = ''; // 입력 필드 초기화
      }
    }
  };

  function removeTag(tag: string): void {
    setTagList((tags) => tags.filter((t) => t !== tag));
  }
  return (
    <div className="page flex flex-col items-center justify-center mt-6 px-[15px]">
      <form
        id="article-form"
        className="w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <input
            className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            placeholder="Article Title"
            value={title}
            required
          />
        </div>
        <div>
          <input
            className="px-3 py-2 w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="description"
            id="description"
            onChange={onChange}
            placeholder="What's this article about?"
            value={description}
            required
          />
        </div>
        <div>
          <textarea
            className="px-3 py-2 w-full text-[#55595c] border rounded mb-4"
            name="body"
            id="body"
            rows={8}
            onChange={onChange}
            placeholder="Write your article (in markdown)"
            value={body}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="px-3 py-2 w-full text-[#55595c] border rounded"
            name="tag_list"
            id="tag_list"
            onKeyUp={addTag}
            placeholder="Enter tags"
          />
          <div>
            {tagList &&
              tagList?.map((tag, index) => (
                <span
                  onClick={() => removeTag(tag)}
                  key={index}
                  className="cursor-pointer text-white bg-[#818a91] text-xs py-1 px-[0.6rem] rounded-[10rem] mr-[3px]"
                >
                  x {tag}
                </span>
              ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            className="px-6 py-3 text-xl rounded text-white bg-[#5cb85c] select-none hover:bg-[#1E822A]"
          >
            Publish Article
          </button>
        </div>
      </form>
    </div>
  );
}
