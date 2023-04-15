import { FC } from "react";
import OrdersArrayNoProfile from "../../components/orders-array-no-profile/orders-array-no-profile";
import FeedData from '../../components/feed-data/feed-data';

import styles from './feed.module.css';

const FeedPage: FC = () => {

    return (
        <div>
            
            <h1 className={`${styles.text} text text_type_main-large mb-5`}>Лента заказов</h1>
                < div className={styles.container} >
                
                    <div className={styles.container_div_left}>
                        <OrdersArrayNoProfile />
                    </div>
                    <div className={styles.container_div_left}>
                        <FeedData />
                    </div>

                </div>
            
        </div>
    )
}

export default FeedPage;

