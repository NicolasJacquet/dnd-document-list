import React, { useState } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import {DropResult} from 'smooth-dnd';
import { applyDrag } from '../../utils';
import ListItem from '../list-item';
import DATA_LIST, {DataType} from '../../data';
import style from './style.module.scss';

const List = () => {

  const [ list, setList ] = useState<DataType[]>(DATA_LIST);

  const onRemove = (documentId: number):void => {
    const newList = list.filter(item => item.id !== documentId);
    setList(newList);
  }

  const onUpdateDesc = (documentId: number, newDesc: string):void => {
    const newList = [...list];
  
    newList.map(item => {
      if (documentId === item.id) {
        item.description = newDesc;
      }
      return item;
    });
    setList(newList);
  }

  const onDrop = (e: DropResult) => {
    setList((prevItems: DataType[]) => {
      return applyDrag(prevItems, e);
    });
  }

  return (
    <>
    {
      list.length > 0 ?
      (
        <Container
          lockAxis="y"
          onDrop={onDrop}
          dragClass={style.draggedItem}
          dropPlaceholder={{
            animationDuration: 250,
            showOnTop: true,
            className: style.itemsDropPlaceholder
          }}
          nonDragAreaSelector=".noDraggableArea"
        >
          {list.map((item, index) => {
            return (
              <Draggable className={style.draggableItem} key={item.id}>
                <ListItem
                  position={index+1}
                  data={item}
                  onRemove={onRemove}
                  onUpdateDesc={onUpdateDesc}
                />
              </Draggable>
            )
          })}
        </Container>
      ) : (
        <p className={style.emptyListTxt}>
          No more items available...
        </p>
      )
    }
    </>
  );
}

export default List;
