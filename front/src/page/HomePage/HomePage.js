import './HomePage.css';
import 'semantic-ui-css/semantic.min.css'
import {BottomSide} from '../../components/BottomSide/BottomSide';
import {NavBarHome} from '../../components/NavBarHome/NavBarHome';
import { Provider } from 'react-redux';
import store from '../../redux/store';



//Create function component
export const HomePage =(props) =>{
  return (

    <div className="container-fluid">
      <Provider store={store} >
        <div className="UpSide">
          <NavBarHome/>
        </div>
        <div className="BottomSide">
          <BottomSide/>
        </div>
      </Provider>
    </div>
  );
}

