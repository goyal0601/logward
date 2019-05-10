import React,{Component} from 'react';
import {Button, Input} from 'antd';
import './ReleasesList.css';
import ReleaseTable from './ReleaseTable';

const Search = Input.Search;
class ReleasesList extends Component {
    state={
        type:'ALL',
        search: '',
    }
    render(){
        const {type,search}=this.state;
        return (
            <div>
                <div className='releases-header'>
                    <div className='releases'>Releases</div>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div style={{display:'flex'}}>
                        <div className='release-button'>
                                <Button disabled={type==='ALL'} type='primary' onClick={()=>this.setState({type:'ALL'})}>ALL</Button>
                            </div>
                            <div className='release-button'>
                                <Button disabled={type==='INPROGRESS'} type='primary' onClick={()=>this.setState({type:'INPROGRESS'})}>IN PROGRESS</Button>
                            </div>
                            <div className='release-button'>
                                <Button disabled={type==='RELEASED'} type='primary' onClick={()=>this.setState({type:'RELEASED'})}>RELEASED</Button>
                            </div>
                            <div className='release-button'>
                                <Button disabled={type==='UNRELEASED'}type='primary' onClick={()=>this.setState({type:'UNRELEASED'})}>UNRELEASED</Button>
                            </div>
                        </div>
                        <div className='input-search'>
                            <Search value={search} placeholder="Type here ..." style={{ width: 300 }} onChange={(e)=>this.setState({search:e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div><ReleaseTable type={type} search={search}/></div>
            </div>
          );
    }
  
}

export default ReleasesList;
