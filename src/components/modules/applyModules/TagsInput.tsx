// import React, { useState, KeyboardEvent } from 'react';

// const TagInput: React.FC = () => {
//   const [tags, setTags] = useState<string[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter' && inputValue.trim() !== '') {
//       const newTag = inputValue.trim();
//       setTags([...tags, newTag]);
//       setInputValue('');
//     } else if (
//       event.key === 'Backspace' &&
//       inputValue === '' &&
//       tags.length > 0
//     ) {
//       const updatedTags = tags.slice(0, -1);
//       setTags(updatedTags);
//     }
//   };

//   const handleTagDelete = (tagToDelete: string) => {
//     const updatedTags = tags.filter((tag) => tag !== tagToDelete);
//     setTags(updatedTags);
//   };

//   console.log('tags', tags);

//   return (
//     <div className="flex flex-col gap-[10px]">
//       <div>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={handleInputKeyDown}
//           placeholder="Add tags..."
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         />
//       </div>
//       <div className="border border-[red] h-auto">
//         {tags.map((tag, index) => (
//           <div
//             key={index}
//             className="block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 h-[50px]"
//           >
//             {tag}
//             <button onClick={() => handleTagDelete(tag)} className="ml-1">
//               x
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TagInput;

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface TagsInputProps {}

const TagsInput: React.FC<TagsInputProps> = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tags, setTags] = useState<{ id: string; value: string }[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const newTag = { id: Date.now().toString(), value: inputValue.trim() };
      setTags([...tags, newTag]);
      setInputValue('');
    }
  };

  const handleTagDelete = (tagToDeleteId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagToDeleteId));
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter"
          className="p-2 border rounded"
        />
      </div>
      <div>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex p-2 items-center gap-2 border rounded bg-gray-200"
          >
            <span>{tag.value}</span>
            <button
              onClick={() => handleTagDelete(tag.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
