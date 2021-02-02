import addReport from '../addReport/addReport';
import addOperation from '../addOperation/addOperation';
import drawHotKeys from '../drawHotKeys/drawHotKeys';

export default function router() {
  window.onpopstate = () => {
    console.log(location.hash);
    if (location.hash === '#report') {
      addReport();
    } else if (location.hash === '#operation') {
      addOperation();
    } else if (location.hash === '#hot-keys') {
      drawHotKeys();
    }
  };
}