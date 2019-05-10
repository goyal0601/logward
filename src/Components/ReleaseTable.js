import React,{Component} from 'react';
import moment from 'moment';
import {Table, Icon, Tag, Progress, Dropdown, Menu, Modal} from 'antd';
import AddNewRelease from './AddNewRelease.js';
import { connect } from 'react-redux';
import { addData,deleteData,editData } from '../actions';
import EditRelease from './EditRelease.js';


const statusTag = (status)=>{
    switch(status){
        case 'INPROGRESS':
        return <Tag color="blue">IN PROGRESS</Tag>
        case 'UNRELEASED':
        return <Tag color="red">UNRELEASED</Tag>
        case 'RELEASED':
        return <Tag color="green">RELEASED</Tag>
        default:
        return status
    }
}




class ReleaseTable extends Component {

  state={
    dataEdit:null
  }

  addData=(data)=>{
    const { dispatch }=this.props;
    dispatch(addData(data));
  }
  onEdit=(data)=>{
    const { dispatch }=this.props;
    const {dataEdit} =this.state;
    dispatch(editData(dataEdit.id,data))
    this.setState({dataEdit:null})
  }
  deleteData = (id)=>{
    const { dispatch }=this.props;
    dispatch(deleteData(id));
  }
    render(){
        const columns = [
            {
              title: '',
              render: record => (
                <Icon type="database" />
              )
            },
            {
                title: 'Version',
                key: 'version',
                dataIndex:'version'
            },
            {
                title: 'Status',
                key:'status',
                render: record => (
                    statusTag(record.status)
                  )
            },
            {
                title: 'Progress',
                key:'progress',
                render: record => (
                    <Progress percent={100} successPercent={record.progress} format={() => record.progress + '%'}/>
                  )
            },
            {
                title: 'Start Date',
                key:'startDate',
                render: record => (
                    record.startDate ? moment
                        .unix(
                          record.startDate
                        )
                        .format('Do MMM YYYY'):'---'
                  )
            },
            {
                title: 'Release Date',
                key:'releaseDate',
                render: record => (
                    record.releaseDate ? moment
                        .unix(
                          record.releaseDate
                        )
                        .format('Do MMM YYYY'):'---'
                  )
            },
            {
                title: 'Description',
                key: 'description',
                dataIndex:'description'
            },
            {
                title: 'Actions',
                key:'id',
                render: record => ( 
                    <Dropdown overlay={<Menu><Menu.Item>
                       <Icon type="edit" onClick={()=>this.setState({dataEdit:record})}/>
                      </Menu.Item>
                      <Menu.Item>
                      <Icon type="delete" onClick={()=>this.deleteData(record.id)}/>
                      </Menu.Item></Menu>} placement="bottomLeft">
                        <Icon type="ellipsis" style={{fontSize:'24px'}}/>
                    </Dropdown>  
                  )
            }
          ];
          const {dataEdit}= this.state;
          let {datas} = this.props;
          const {type}=this.props;
          if(type !== 'ALL')
            datas = datas.filter(dat=>dat.status === type)
        return (
            <div style={{padding:'8px 16px'}}>
                <div>
                    <Table columns={columns} dataSource={datas} rowKey={record => record.id}/>
                </div>
                <AddNewRelease addData={this.addData}/>
                <Modal visible={dataEdit ?true : false} footer={null}
                  onCancel={()=>this.setState({dataEdit:null})}>
                  {dataEdit && <EditRelease dataEdit={dataEdit} onSubmit={this.onEdit}/>}
                </Modal>
            </div>
          );
    }
  
}

const mapStateToProps = (state,ownProps) => {
  const {search}=ownProps;
  let datas = state.cardData;
  if(search !== '')
    datas = state.cardData.filter(dat=> dat.version.includes(search) || dat.description.includes(search))
  return {
  datas
}
}


export default  connect(mapStateToProps)(ReleaseTable);
