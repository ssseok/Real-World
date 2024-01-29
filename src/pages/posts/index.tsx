import { useState } from 'react';

export default function EditorPage() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  console.log(tagList);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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

  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !tagList.includes(newTag)) {
        setTagList((prev) => [...prev, newTag]);
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (index: number) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };
  return (
    <div className="page flex flex-col items-center justify-center mt-6 px-[15px]">
      <form className="w-full" onSubmit={onSubmit}>
        <div>
          <input
            className="px-6 py-3 text-xl w-full text-[#55595c] border rounded mb-4"
            type="text"
            name="title"
            id="title"
            onChange={onChange}
            placeholder="Article Title"
            value={title}
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
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="px-3 py-2 w-full text-[#55595c] border rounded"
            name="tag_list"
            id="tag_list"
            onKeyDown={onTagKeyDown}
            placeholder="Enter tags"
          />
          <div>
            {tagList &&
              tagList?.map((tag, index) => (
                <span
                  onClick={() => removeTag(index)}
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
            type="submit"
            className="px-6 py-3 text-xl rounded text-white bg-[#5cb85c] select-none hover:bg-[#1E822A]"
          >
            Publish Article
          </button>
        </div>
      </form>
    </div>
  );
}
