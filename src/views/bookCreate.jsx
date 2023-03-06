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
  const [bookContent, setBookContent] = useState(['']);
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  async function handleGenerateChapterTitles(event) {
    event.preventDefault();

    const prompt = `${bookTitle}\n${bookSubtitle}\n\n${bookDescription}\n\n Write 10 chapter titles for this book. `;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 4000,
        temperature:.5,
    
      });
      console.log(response.data.choices[0].text.split('\n'));
      

    const generatedChapterTitles = response.data.choices[0].text.split('\n');
    setChapterTitles(generatedChapterTitles);
  }

  async function handleWriteChapter(title, description) {
    const prompt = `${bookTitle}\n${bookSubtitle}\n\n${bookDescription}\n\n${title}\n${description}\n\nWrite a chapter for this book. Write 2,000 words. If you are out of tokens write {ContinueChapterNext} as the last word if the chapter is about 2000 words write {chapterComplete as the last word}`;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 4000,
        temperature:.5,
    
      });
      console.log(response.data.choices[0].text.split('\n'));

    const chapterContent = response.data.choices[0].text.split('\n');
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
    handleWriteChapter(title, description)
      .then(chapterContent => {
        const newChapter = `${title}\n\n${chapterContent}\n\n`;
        setBookContent(bookContent => bookContent + newChapter);
      })
      .catch(error => {
        console.error('Error writing chapter:', error);
      });
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
            <span>
            <div>{title}</div>
            <button onClick={() => handleChapterClick(title, '')}>Write Chapter</button>
            </span>
          </div>
        ))}
      </div>
      <div className="BookContent">
        <textarea value={bookContent} readOnly />
        <button onClick={() => bookContent && handleDownloadBook()}>Download File</button>

      </div>
   
    </div>
)}

