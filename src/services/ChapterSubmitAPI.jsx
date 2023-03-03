import React, { useState } from 'react';
import axios from 'axios';

export function BookForm() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [chapterTitles, setChapterTitles] = useState([]);

  async function handleGenerateChapters(event) {
    event.preventDefault();

    const prompt = `${bookTitle}\n\n${bookDescription}\n\nGenerate 10 chapter titles for this book.`;

    const response = await axios.post('https://api.chatgpt.com/generate', {
      api_key: 'YOUR_API_KEY',
      model: 'chatgpt-3.5',
      prompt: prompt,
      length: 10,
    });

    const generatedChapterTitles = response.data.results;
    setChapterTitles(generatedChapterTitles);
  }

  function handleTitleChange(event) {
    setBookTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setBookDescription(event.target.value);
  }

  return (
    <form onSubmit={handleGenerateChapters}>
      <label>
        Book title:
        <input type="text" value={bookTitle} onChange={handleTitleChange} />
      </label>
      <label>
        Book description:
        <textarea value={bookDescription} onChange={handleDescriptionChange} />
      </label>
      <button type="submit">Generate Chapters</button>
      <ul>
        {chapterTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </form>
  );
}
