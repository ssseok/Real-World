export default function ArticleComment() {
  return (
    <div className="page">
      <form className="flex items-center justify-center">
        <div className=" border border-[#e5e5e5]">
          <div>
            <textarea name="" id="" className="p-5"></textarea>
          </div>
          <div className="border-t border-[#e5e5e5] flex justify-between items-center py-3 px-5">
            <img src="" alt="" />
            <button
              type="submit"
              className="font-bold py-1 px-2 text-sm rounded text-white bg-[#5cb85c] border-[#5cb85c]"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
