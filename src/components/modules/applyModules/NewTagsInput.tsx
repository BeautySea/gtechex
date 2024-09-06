import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag, Tooltip, theme } from 'antd';

type Props = {
  name?: string;
  defaultValue?: Array<string>;
  style?: object;
  className?: string;
  placeholder?: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
};

const TagsInput = ({
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
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    setData(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const addTag = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      setData([...tags, inputValue]);
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
    newTags[editInputIndex] = editInputValue;
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
                key={tag}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const isLongTag: boolean = tag.length > 20;
          //   #D5613C
          const tagElem = (
            <Tag
              key={tag}
              closable={true}
              style={{ userSelect: 'none' }}
              className="text-xs md:text-sm bg-[#F3F3F3] p-1 rounded-lg leading-6 border border-[#9B9B9B] font-medium px-5 py-2 my-1 text-[#5F5F5F]"
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index);
                    setEditInputValue(tag);
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
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

export default TagsInput;
