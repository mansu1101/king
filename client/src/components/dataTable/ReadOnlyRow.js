import { format } from "date-fns";
import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact._id}</td>
            <td>{contact.lotteryName}</td>
            <td>{contact.code}</td>
            <td>{format(new Date(contact.publishDate), 'dd-MM-yyyy')}</td>
            <td>
                <button
                    className='btn btn-primary'
                    onClick={(event) => handleEditClick(event, contact)}
                >
                    Edit
                </button>
                {/* <button type="button" onClick={() => handleDeleteClick(contact._id)}>
          Delete
        </button> */}
            </td>
        </tr>
    );
};

export default ReadOnlyRow;
