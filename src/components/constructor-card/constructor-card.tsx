import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css';
import { useDispatch } from '../../hooks/hooks';
import EmptyConstructorElement from '../empty-constructor-element/empty-constructor-element';
import { BURGER_CONSTRUCTOR_DELETE, BURGER_CONSTRUCTOR_MOVE } from "../../services/actions/burger-constructor-actions";
import { BURGER_INGREDIENTS_DECREASECOUNTER } from "../../services/actions/burger-ingredients-actions";
import { useRef } from "react";
import { FC } from "react";
import { nullIngredient } from '../../services/reducers/burger-ingredients-reducer';
import { ConstructorCardProps, RectResult } from '../../types/types';

const getRect = (element: HTMLElement | null): RectResult | null => {
  if (!element) return null;
  return element.getBoundingClientRect();
};


const ConstructorCard: FC<ConstructorCardProps> = ({ item, type, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const refConstructor = useRef(null);

  

  function handleDeleteClick(key: string, _id: string) {


    dispatch({
      type: BURGER_CONSTRUCTOR_DELETE,
      sortedId: key,
    });
    dispatch({
      type: BURGER_INGREDIENTS_DECREASECOUNTER,
      _id: _id,
    })
  }


  //СОРТИРОВКА  
  const [{ isDragging }, drag] = useDrag({

    type: "constructorCard",
    item: () => {
      // Определяем элемент
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });



  const [, drop] = useDrop({

    accept: "constructorCard",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },

    hover(item: any, monitor: any) {
      if (item.type === "bun") {
        return;
      }


      if (!refConstructor.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;


      if (dragIndex === hoverIndex) {
        return;
      }


      const hoverBoundingRect = getRect(refConstructor.current);

      let hoverMiddleY = 0;
      if ((hoverBoundingRect !== null))
        hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      let hoverClientY = 0;
      if ((clientOffset !== null) && (clientOffset.y !== null) && (hoverBoundingRect !== null))
        hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if ((hoverIndex) && (hoverIndex !== null) )
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

      if ((hoverIndex) && (hoverIndex !== null) )
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

      dispatch({
        type: BURGER_CONSTRUCTOR_MOVE,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex ?? 0,
      });


      item.index = hoverIndex;
    }

  });


  drag(drop(refConstructor));
 

  return (
    <div className={styles.container} ref={refConstructor}>
      <div className={styles.box1}  >
        {(type === "sausemain") && <DragIcon type="primary" />}
      </div>
      <div className={styles.box2} >
        {(item === nullIngredient) && (type === "bunUp") &&
          <EmptyConstructorElement
            text={"Выберите булку"} />
        }
        {(item === nullIngredient) && (type === "sausemain") &&
          <EmptyConstructorElement
            text={"Выберите ингредиент"} />
        }
        {(item !== nullIngredient) && (type === "bunUp") &&
          <ConstructorElement
            text={item.name + "  верх"}
            price={item.price}
            thumbnail={item.image_mobile}
            isLocked={true}
            type="top" />
        }
        {
          (type === "bunDown") && (item !== null) &&
          <ConstructorElement
            text={item.name + "  низ"}
            price={item.price}
            thumbnail={item.image_mobile}
            isLocked={true}

            type="bottom" />
        }
        {
          (type === "sausemain") && (item !== nullIngredient) &&
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}

            handleClose={() => handleDeleteClick(item.sortedId, item._id)}
          />
        }



      </div>
    </div>
  );
}


export default ConstructorCard;
