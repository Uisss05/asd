import { useState } from "react";

export default function ArticleForm({ addArticle }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = { title, content, image };
    addArticle(newArticle);
    setTitle("");
    setContent("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-semibold">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required></textarea>
      </div>
      <div>
        <label className="block text-sm font-semibold">Image</label>
        <input type="file" onChange={handleImageChange} className="w-full p-2 border border-gray-300 rounded" />
      </div>
      <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Add Article
      </button>
    </form>
  );
}
