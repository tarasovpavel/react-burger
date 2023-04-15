import loaderStyles from "./loader.module.css";
import { FC } from 'react';

const Loader: FC = () => (
  <div >
    <div className={loaderStyles.loader}> </div>
  </div>
);

export default Loader;
