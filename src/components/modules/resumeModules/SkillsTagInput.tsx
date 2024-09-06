// import React from 'react';

// const SkillsTagInput = () => {
//   return (
//     <div>

//     </div>
//   );
// }

// export default SkillsTagInput;
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip, theme } from 'antd';

interface Skill {
  name: string;
  proficiency_level: string | null;
  years_of_experience: number;
}

type Props = {
  name?: string;
  defaultValue?: Skill[];
  style?: object;
  className?: string;
  placeholder?: string;
  setData: any;
};

const SkillsTagInput = ({
  name,
  style,
  className,
  placeholder,
  setData,
  defaultValue = [],
}: Props) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(defaultValue);
  const [inputVisible, setInputVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag.name !== removedTag);
    setTags(newTags);
    setData(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const addTag = () => {
    if (inputValue && tags.every((tag) => tag.name !== inputValue)) {
      setTags([
        ...tags,
        { name: inputValue, proficiency_level: null, years_of_experience: 0 },
      ]);
      setData([
        ...tags,
        { name: inputValue, proficiency_level: null, years_of_experience: 0 },
      ]);
    }
    setInputVisible(true);
    setInputValue('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirmOnBlur = () => {
    addTag();
  };

  const handleInputConfirmOnEnter = (e: React.KeyboardEvent<object>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    addTag();
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = {
      ...newTags[editInputIndex],
      name: editInputValue,
    };
    setTags(newTags);
    setData(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (
    <>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="large"
          value={inputValue}
          name={name}
          style={style}
          className={className}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleInputConfirmOnBlur}
          onPressEnter={handleInputConfirmOnEnter}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> New Tag
        </Tag>
      )}

      <div>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag.name}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag: boolean = tag.name.length > 20;
          const tagElem = (
            <Tag
              key={tag.name}
              closable={true}
              style={{ userSelect: 'none' }}
              className="text-xs md:text-sm bg-[#F3F3F3] p-1 rounded-lg leading-6 border border-[#9B9B9B] font-medium px-5 py-2 my-1 text-[#5F5F5F]"
              onClose={() => handleClose(tag.name)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag.name);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag.name} key={tag.name}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      </div>
    </>
  );
};

export default SkillsTagInput;
