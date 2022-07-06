import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {get, isEmpty} from 'lodash';
import {useTranslation} from 'react-i18next';
import React, {memo, useContext} from 'react';
import * as styles from './List.module.css';
import {formatDateRange, reorder} from '../../../utils';
import {useDispatch, useSelector} from '../../../contexts/ResumeContext';
import ListItem from './ListItem';
import ModalContext from '../../../contexts/ModalContext';
import _ from 'lodash';

const List = ({
  path,
  title,
  titlePath,
  subtitle,
  subtitlePath,
  text,
  textPath,
  hasDate,
  event,
}) => {
  const {t, i18n} = useTranslation();
  const items = useSelector(path, []);
  const {emitter} = useContext(ModalContext);
  const dispatch = useDispatch();

  const handleAdd = () => emitter.emit(event);

  const handleEdit = (data) => emitter.emit(event, data);

  const onDragEnd = (result) => {
    const {source, destination} = result;

    if (!destination) {
      return;
    }

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    if (sourceDroppableId !== destinationDroppableId) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const itemsReordered = reorder(items, source.index, destination.index);
    dispatch({
      type: 'on_input',
      payload: {
        path,
        value: itemsReordered,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className={styles.list}>
        {isEmpty(items) ? null : ( // <EmptyList />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={path}>
              {(dropProvided) => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}>
                  {items.map((x, i) => (
                    <ListItem
                      key={x.id}
                      data={x}
                      path={path}
                      title={title || get(x, titlePath, '')}
                      subtitle={
                        subtitle ||
                        get(x, subtitlePath, '') ||
                        (hasDate &&
                          formatDateRange(
                            {
                              startDate: x.startDate || x.date,
                              endDate: x.endDate,
                              language: i18n.language,
                              fallback: _.has(x, 'endDate'),
                            },
                            t,
                          ).trim())
                      }
                      text={text || get(x, textPath, '')}
                      onEdit={() => handleEdit(x)}
                      isFirst={i === 0}
                      isLast={i === items.length - 1}
                      index={i}
                      event={event}
                    />
                  ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default memo(List);
