import { addDays } from 'date-fns'
import format from 'date-fns/format'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { DateRangePicker } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DateRange() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // date selection
    const [range, setRange] = useState({

        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: 'selection'

    })
    // open close
    const [open, setOpen] = useState(true)

    // get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
        // event listeners
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)

        return () => {
            document.removeEventListener("keydown", hideOnEscape, true);
            document.removeEventListener("click", hideOnClickOutside, true);
        }
    }, [])

    // Hide on esc press

    const hideOnEscape = (e) => {
        console.log(e.key);
        if (e.key === "Escape") {
            setOpen(false)
        }
    }
    const hideOnClickOutside = (e) => {
        console.log(refOne.current);
        console.log(e.target);

        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return (
        <>
            <div className='inputContainer'>
                <input
                    type="text"
                    className='inputBox w-100 '
                    // onClick={() => {
                    //     setOpen(open => !open)
                    //     console.log("Open State : ", !open);

                    // }}
                    onClick={handleShow}
                    readOnly
                    value={`${format(range.startDate, "dd/MM/yyyy")} to ${format(range.endDate, "dd/MM/yyyy")}`}
                    placeholder={!range.startDate && !range.endDate ? 'Enter the Date Range' : ''}
                />
            </div>
            <Modal className='modal-xl text-center modalDateRange'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                <DateRangePicker
                                onChange={item => setRange(item.selection)}
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                ranges={[range]}
                                months={2}
                                direction='horizontal'
                                className='calenderElement'
                            />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DateRange