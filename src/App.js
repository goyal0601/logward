import React,{Component} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ReleasesList from './Components/ReleasesList';

class App extends Component {
  render() {
    return (
      <div>
        <ReleasesList />
      </div>
    );
  }
}

export default App;
