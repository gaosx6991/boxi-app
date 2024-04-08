import {createContext, RefObject} from 'react';
import {ModalScreenRef} from '../types';

export const ModalScreenRefContext = createContext<RefObject<ModalScreenRef>>({
  current: {show: () => {}, hide: () => {}},
});
