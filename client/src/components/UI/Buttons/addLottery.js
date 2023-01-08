import React, { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { storageActions } from '../../../actions';
import restActions from '../../../actions/rest';
import NotificationMessage from '../../../notification/NotificationMessage';


export const AddLottery = (props) => {
    const [inputs, setInputs] = useState({});
    const [publishDate, setDate] = useState(new Date());
    const [errors, setError] = useState({});
    const handleDateChange = (date) => {
        setDate(date)
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = storageActions.getItem('token')
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        console.log('save lottery Name', { ...inputs, publishDate: publishDate })
        const lotteryUrl = `/admin/lottery`
        restActions.POST(lotteryUrl, { ...inputs, publishDate: publishDate }, config).then((res) => {
            if (res?.data?._id) {
                NotificationMessage.showInfo('Lottery Saved!')
                props.handleClose()
            }
        },
            (err) => {
                if (err?.status === 401) {
                    NotificationMessage.showError('Invalid user to save informations!')
                } else {
                    NotificationMessage.showError(err.message)
                }
            },
        )
    }

    return (
        <Modal show={props.showAddLotteryModel} backdrop='static' centered  >
            <div className='modal-header'>
                <h5 className='modal-title font-weight-bold'>Add New Lottery</h5>
                <button
                    onClick={props.handleClose}
                    type='button'
                    className='close custome-close'
                    data-dismiss='modal'
                    aria-label='Close'
                >
                    <span aria-hidden='true'>×</span>
                </button>
            </div>
            <Modal.Body>
                <div className='mt-2'>
                    <div className='col-sm-12'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Lottery name</label>
                                <div className="col-sm-8">
                                    <input
                                        maxLength={'64'}
                                        type='text'
                                        name='lotteryName'
                                        className={`form-control ${errors?.lotteryNameError ? 'is-invalid' : ''}`}
                                        // onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={inputs.lotteryName}
                                        placeholder='Enter name'
                                    />
                                </div>
                                <span className='text-danger'>{errors?.lotteryNameError}</span>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Code</label>
                                <div className="col-sm-8">
                                    <input
                                        type="number"
                                        name="code"
                                        value={inputs.code}
                                        className={`form-control ${errors?.codeError ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                        placeholder='Enter code for lottry'
                                    />
                                </div>
                                <span className='text-danger'>{errors?.codeError}</span>
                            </div>
                            <div className='form-group row'>
                                <label className='col-sm-4 col-form-label'>Publish Date </label>
                                <div className="col-sm-8">
                                    <DatePicker
                                        selected={publishDate}
                                        onChange={handleDateChange}
                                        name="publishDate"
                                        className={`form-control ${errors?.publishDateError ? 'is-invalid' : ''}`}
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                                <span className='text-danger'>{errors?.publishDateError}</span>
                            </div>
                            <div className='text-center mt-5'>
                                <button type='submit' className='btn btn-primary px-5'>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}