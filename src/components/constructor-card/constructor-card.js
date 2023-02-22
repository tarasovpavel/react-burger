import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructorCard.module.css';
import { useDispatch } from 'react-redux';
import { EmptyConstructorElement } from '../emptyConstructorElement/emptyConstructorElement';
import { BURGER_CONSTRUCTOR_DELETE, BURGER_CONSTRUCTOR_MOVE } from "../../services/actions/burgerConstructorActions";
import { BURGER_INGREDIENTS_DECREASECOUNTER } from "../../services/actions/burgerIngredientsActions";
import { useRef } from "react";


export function ConstructorCard({ item, type, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const refConstructor = useRef(null);

  function handleDeleteClick(key, _id) {
    //console.log('handleDeleteClick');
    //console.log(key);
    dispatch({
      type: BURGER_CONSTRUCTOR_DELETE,
      sortedId: key,
    });
    dispatch({
      type: BURGER_INGREDIENTS_DECREASECOUNTER,
      _id: _id,
    })
  }
  //let datenow= Date.now();
  //console.log(datenow);

  //СОРТИРОВКА  
  const [{ isDragging }, drag] = useDrag({
    type: "constructorCard",
    item: () => {
      // Определяем элемент
      //console.log('dragging');
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
    hover(item, monitor) {
      if (!refConstructor.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      //console.log('useDrop');
      //console.log (refConstructor.current);
      const hoverBoundingRect = refConstructor.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: BURGER_CONSTRUCTOR_MOVE,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
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
        {(item === null) && (type === "bunUp") &&
          <EmptyConstructorElement
            text={"Выберите булку"} />
        }
        {(item === null) && (type === "sausemain") &&
          <EmptyConstructorElement
            text={"Выберите ингредиент"} />
        }
        {(item !== null) && (type === "bunUp") &&
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
          (type === "sausemain") && (item !== null) &&
          <ConstructorElement
            text={item.data.name}
            price={item.data.price}
            thumbnail={item.data.image_mobile}

            handleClose={() => handleDeleteClick(item.sortedId, item.data._id)}
          />
        }



      </div>
    </div>
  );
}

