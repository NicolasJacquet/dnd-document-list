import React, { useState } from 'react';
import {DataType} from '../../data';
import classnames from 'classnames';
import DescriptionTextArea from '../description-textarea';
import style from './style.module.scss';

type PropsType = {
  position: number,
  data: DataType,
  onRemove: (documentId: number) => void,
  onUpdateDesc: (documentId: number, newDesc: string) => void
};

const DeleteConfirmation = ({shouldBeDeleted}:{shouldBeDeleted: (isConfirmed: boolean) => void}) => {

  const ActionBtn = (props:{isConfirmed: boolean, className?: string, children: string}): JSX.Element => {
    const { className, isConfirmed, children } = props;
    return (
      <button onClick={() => shouldBeDeleted(isConfirmed)} className={classnames(style.actionBtn, className)}>
          {children}
      </button>
    )
  }

  return (
    <div className={classnames(style.confirmationContainer, 'noDraggableArea')}>
      <p className={style.confirmationTxt}>Do you really want to delete this item?</p>
      <div className={style.actions}>
        <ActionBtn isConfirmed className={style.secondary}>
          Yes
        </ActionBtn>
        <ActionBtn isConfirmed={false}>
          No
        </ActionBtn>
      </div>
    </div>
  )
}

const ListItem = (props: PropsType) => {
  const [isAddDesc, setIsAddDesc] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { data, onRemove, onUpdateDesc, position } = props;

  const handleAddDesc = () => {
    setIsAddDesc(!isAddDesc);
  }

  const updateAddDescState = () => {
    setIsAddDesc(false);
  }

  const shouldBeDeleted = (isConfirmed: boolean) => {
    if (isConfirmed) {
      onRemove(data.id);
    }
    setIsConfirmationVisible(false);
  }

  return (
    <div className={style.listItem}>
      <span className={style.position}>{position}.</span>
      <p className={style.title}>{data.fileName}</p>
      <p className={style.informations}>
        {`${data.date}, ${data.userName}`}
      </p>
      {(data.description || isAddDesc) && (
        <DescriptionTextArea
          itemId={data.id}
          onUpdateDesc={onUpdateDesc}
          description={data.description}
          focus={isAddDesc}
          updateAddDescState={updateAddDescState}
        />
      )}
      <div>
        {!data.description && !isAddDesc && (
          <button onClick={handleAddDesc} className={style.cta}>
            Add description
          </button>
        )}
        <button className={style.cta} onClick={() => setIsConfirmationVisible(true)}>
          Delete
        </button>
      </div>
      {isConfirmationVisible && <DeleteConfirmation shouldBeDeleted={shouldBeDeleted} />}
    </div> 
  );
}

export default ListItem;
