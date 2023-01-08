import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal";
import "react-datepicker/dist/react-datepicker.css";
import { AddLottery } from './UI/Buttons/addLottery';
import { UpdateLottery } from './UI/Buttons/updateLottery';
import ReadOnlyRow from './dataTable/ReadOnlyRow';
import EditableRow from './dataTable/EditableRow';
import restActions from '../actions/rest';

export const Dashboard = (props) => {
    const [openAddLotteryModel, setAddLotteryFlag] = useState(false)
    const [openLotteryNameModel, setSaveLotteryNameFlag] = useState(false)
    const [allLotteries, setAllLotteries] = useState([])

    const fetchData = async () => {
        const url = '/admin/lottery'
        const key = 'publishDate'
        try {
            const { data: lotteries } = await restActions.GET(url)
            console.log('dash board Actual count', lotteries.length)
            const arrayUniqueByKey = [...new Map(lotteries.map(item =>
                [item[key], item])).values()];
            setAllLotteries(arrayUniqueByKey)
            // filterData(arrayUniqueByKey)
            console.log('Unique count', arrayUniqueByKey)
        } catch (exception) {
            //   setHomeData([])
            console.log('Unable to load data!!', exception)
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    const [editFormData, setEditFormData] = useState({
        lotteryName: "",
        code: "",
        publishDate: "",
    });

    const [editLotteryId, setEditLotteryId] = useState(null);

    //
    const handleEditFormChange = (event) => {
        event.preventDefault(); // ???

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    //submit handler
    //Add 
    // const handleAddFormSubmit = (event) => {
    //     event.preventDefault(); // ???

    //     //data.json
    //     const newLottery = {
    //         // id: nanoid(),
    //         fullName: addFormData.fullName, //handleAddFormChange
    //         address: addFormData.address,
    //         phoneNumber: addFormData.phoneNumber,
    //         email: addFormData.email
    //     };

    //     //lottries
    //     const newLotteries = [...allLoteries, newLottery];
    //     setAllLotteries(newLotteries);
    // };

    //edit form submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedLottery = {
            id: editFormData._id, // editLotteryId, //
            lotteryName: editFormData.lotteryName,
            code: editFormData.code,
            publishDate: editFormData.publishDate
        };

        const newLottery = [...allLotteries]; //json.data 
        const index = allLotteries.findIndex((lottery) => lottery._id === editLotteryId);
        newLottery[index] = editedLottery; //

        setAllLotteries(newLottery);
        setEditLotteryId(null);
    };

    //edit click handle
    const handleEditClick = (event, lottery) => {
        event.preventDefault(); // ???

        setEditLotteryId(lottery._id);
        const formValues = {
            lotteryName: lottery.lotteryName,
            code: lottery.code,
            publishDate: lottery.publishDate
        };
        setEditFormData(formValues);
        console.log('form values', formValues)
    };

    //edit
    const handleCancelClick = () => {
        setEditLotteryId(null);
    };

    // delete
    const handleDeleteClick = (lotteryId) => {
        const newLotteries = [...allLotteries];
        const index = newLotteries.findIndex((item) => item._id === lotteryId);
        newLotteries.splice(index, 1);
        setAllLotteries(newLotteries);
    };

    return (
        <>
            <div className='container mt-5' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => setAddLotteryFlag(true)}> Add New Lottery </button>
                </div>
                <div className='row'>
                    <button className='btn btn-primary' onClick={() => setSaveLotteryNameFlag(true)}> Update Lottery Name </button>
                </div>
                {openAddLotteryModel && <AddLottery showAddLotteryModel={openAddLotteryModel} handleClose={() => {
                    setAddLotteryFlag(false)
                }} />}
                {openLotteryNameModel &&
                    <UpdateLottery showAddLotteryModel={openLotteryNameModel} handleClose={() => {
                        setSaveLotteryNameFlag(false)
                    }} />}
                {/*    */}
            </div>
            <br></br>
            <div className='app-container'>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Publish Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allLotteries.map((lottery) => (
                                <>
                                    {editLotteryId === lottery._id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            contact={lottery}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </form>

            </div>
        </>
    )
}
// export default Dashboard

