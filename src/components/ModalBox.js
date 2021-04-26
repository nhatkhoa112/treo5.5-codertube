import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

import YoutubeEmbed from "../components/YoutubeEmbed"

const ModalBox = ({query}) => {
    const [xlShow, setXlShow] = useState(false);
    return (
        <div>
            <Button variant="primary" className="trailer" onClick={() => setXlShow(true)}>View Trailer</Button>
            <Modal
                size="xl"
                show={xlShow}
                onHide={() => setXlShow(false)}
                aria-labelledby="example-modal-sizes-title-xl"

            >
                <Modal.Body><YoutubeEmbed query={query} /></Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalBox