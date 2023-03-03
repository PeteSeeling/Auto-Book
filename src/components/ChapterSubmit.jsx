import React, { useState } from 'react';

export function ChapterSubmit() {
  const [chapterText, setChapterText] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // do something with chapterText
    console.log(chapterText);
  }

  function handleChange(event) {
    setChapterText(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Chapter text:
        <textarea value={chapterText} onChange={handleChange} />
      </label>
      <button type="submit">Submit Chapter</button>
    </form>
  );
}
