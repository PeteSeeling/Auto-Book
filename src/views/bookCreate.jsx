import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';
import {styles} from './BookGenerator.css';


export function BookGenerator() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookSubtitle, setBookSubtitle] = useState('');
  const [bookDescription, setBookDescription] = useState('');
  const [chapterTitles, setChapterTitles] = useState([]);
  const [chapterContent, setChapterContent] = useState('');
  const [bookContent, setBookContent] = useState('');

  async function handleGenerateChapterTitles(event) {
    event.preventDefault();

    const prompt = `${bookTitle}\n${bookSubtitle}\n\n${bookDescription}\n\nGenerate 10 chapter titles for this book.`;

    const response = await axios.post('https://api.chatgpt.com/generate', {
      api_key: 'YOUR_API_KEY',
      model: 'chatgpt-3.5',
      prompt: prompt,
      length: 10,
    });

    const generatedChapterTitles = response.data.results;
    setChapterTitles(generatedChapterTitles);
  }

  async function handleWriteChapter(title, description) {
    const prompt = `${bookTitle}\n${bookSubtitle}\n\n${bookDescription}\n\n${title}\n${description}\n\nWrite a chapter for this book.`;

    const response = await axios.post('https://api.chatgpt.com/generate', {
      api_key: 'YOUR_API_KEY',
      model: 'chatgpt-3.5',
      prompt: prompt,
      length: 1024,
    });

    const chapterContent = response.data.results[0];
    setChapterContent(chapterContent);
  }

  function handleDownloadBook(event) {
    event.preventDefault();

    const blob = new Blob([bookContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `${bookTitle}.docx`);
  }

  function handleTitleChange(event) {
    setBookTitle(event.target.value);
  }

  function handleSubtitleChange(event) {
    setBookSubtitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setBookDescription(event.target.value);
  }

  function handleChapterClick(title, description) {
    handleWriteChapter(title, description);
    const newChapter = `${title}\n\n${chapterContent}\n\n`;
    setBookContent(bookContent => bookContent + newChapter);
  }

  return (
    <div className="BookGenerator">
      <form onSubmit={handleGenerateChapterTitles}>
        <label>
          Book title:
          <input type="text" value={bookTitle} onChange={handleTitleChange} />
        </label>
        <label>
          Book subtitle:
          <input type="text" value={bookSubtitle} onChange={handleSubtitleChange} />
        </label>
        <label>
          Book description:
          <textarea value={bookDescription} onChange={handleDescriptionChange} />
        </label>
        <button type="submit">Book Title Submit</button>
      </form>
      <div className="ChapterTitles">
        {chapterTitles.map((title, index) => (
          <div key={uuidv4()}>
            <div>{title}</div>
            <button onClick={() => handleChapterClick(title, '')}>Write Chapter</button>
          </div>
        ))}
      </div>
      <div className="BookContent">
        <textarea value={bookContent} readOnly />
        <button onClick={() => bookContent && handleDownloadBook()}>Download File</button>

      </div>
   
    </div>
)}

