import React,{Component} from 'react';
import { Form, Field } from 'react-final-form';
import { Input, Button, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

class AddNewRelease extends Component {

validate = values => {
    const requiredFields = ['version'];
    const errors = {};
    const progress = values['progress'];
    if(isNaN(progress))
        errors['progress']='Need to be a number';
    if(progress === '')errors['progress'] = 'Field is Required';
    if(parseInt(progress,10) < 0 || parseInt(progress,10)>100 )
        errors['progress']='Need to be between 0 to 100';
    requiredFields.forEach(name => {
        const value = values[name];
        if (!value) {
        errors[name] = 'Field is Required';
        }
    });
    return errors;
};

onSubmit = (values)=>{
    let data = {};
    const progress = parseInt(values.progress,10);
    data.id = parseInt(moment(new Date()).format('X'),10);
    data.version = values.version;
    data.startDate = values.startDate ? parseInt(moment(values.startDate).format('X'),10):null;
    data.releaseDate = values.releaseDate ? parseInt(moment(values.releaseDate).format('X'),10): null;
    data.progress = progress;
    data.status = progress === 0 ? 'INPROGRESS':progress === 100 ? 'RELEASED' : 'UNRELEASED' 
    data.description = values.description;
    this.props.addData(data);
}

  render() {
    return (
      <div>
       <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        keepDirtyOnReinitialize={true}
        initialValues={{description:''}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div>
              <form onSubmit={handleSubmit}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className="each-field">
                        <div className="label-field">
                            <label>Version</label>
                        </div>
                        <div className="input-field">
                            <Field
                            name="version"
                            type="text"
                            render={({ input, meta }) => (
                                <div>
                                <Input {...input} />
                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>
                            )}
                            />
                        </div>
                    </div>
                    <div className="each-field">
                        <div className="label-field">
                            <label>Start Date</label>
                        </div>
                        <div className="input-field">
                            <Field
                            name="startDate"
                            type='date'
                            render={({ input, meta }) => (
                                <div>
                                <DatePicker {...input} />
                                </div>
                            )}
                            />
                        </div>
                    </div>
                    <div className="each-field">
                        <div className="label-field">
                            <label>Release Date</label>
                        </div>
                        <div className="input-field">
                            <Field
                            name="releaseDate"
                            type='date'
                            render={({ input, meta }) => (
                                <div>
                                <DatePicker {...input} />
                                </div>
                            )}
                            />
                        </div>
                    </div>
                    <div className="each-field">
                        <div className="label-field">
                            <label>Progress Score</label>
                        </div>
                        <div className="input-field">
                            <Field
                            name="progress"
                            type='number'
                            render={({ input, meta }) => (
                                <div>
                                <Input {...input} />
                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>
                            )}
                            />
                        </div>
                    </div>
                    <div className="each-field">
                        <div className="label-field">
                            <label>Description</label>
                        </div>
                        <div className="input-field">
                            <Field
                            name="description"
                            type="text"
                            render={({ input, meta }) => (
                                <div>
                                <Input {...input} />
                                </div>
                            )}
                            />
                        </div>
                    </div>
                    
                    <div style={{padding:"20px"}}>
                    <Button
                        type="primary"
                        htmlType="submit"     
                    >
                        Add
                    </Button>
                    </div>
                </div>
              </form>
          </div>
        )}
      />
      </div>
    );
  }
}

export default AddNewRelease;
