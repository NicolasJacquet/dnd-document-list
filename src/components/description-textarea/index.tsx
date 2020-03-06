import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classnames from 'classnames';
import style from './style.module.scss';

type PropsType = {
    description?: string,
    onUpdateDesc: (itemId: number, sanitizedStr: string) => void,
    itemId: number,
    focus: boolean,
    updateAddDescState: () => void
}

const DescriptionTextArea = (props: PropsType) => {
    const textArea = useRef<HTMLTextAreaElement | null>(null);
    const [value, setValue] = useState('');
    const {description, onUpdateDesc, itemId, focus, updateAddDescState} = props;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value);
    }

    const handleBlur = () => {
        const sanitizedStr = value.replace(/^\s+|\s+$/g, '');
        setValue(sanitizedStr);
        updateAddDescState();
        if (description === sanitizedStr) {
            return;
        }
        onUpdateDesc(itemId, sanitizedStr)
    }

    const handleKeyDown = (e:React.KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (key === 'enter' && (e.metaKey || e.ctrlKey)) {
            if (textArea.current) {
                textArea.current.blur();
            }
        }
    }

    useEffect(() => {
        if (!textArea.current) {
            return;
        }

        if (focus) {
            textArea.current.focus();
        }
        
        if (description) {
            setValue(description);
        }
      }, [description, focus]);

    return (
        <TextareaAutosize
            inputRef={ref => (textArea.current = ref)}
            onBlur={handleBlur}
            onChange={handleChange}
            className={classnames(style.description, 'noDraggableArea')}
            value={value}
            onKeyDown={handleKeyDown}
        />
    )
}

export default DescriptionTextArea;