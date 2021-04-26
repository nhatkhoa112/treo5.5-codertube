import React  from 'react'
import { Modal } from 'react-bootstrap'

import YoutubeEmbed from "../components/YoutubeEmbed"

const ModalBox = ({movieTrailerKey, modalOpen, setModalOpen}) => {
    return (
        <div>
            <Modal
                size="xl"
                show={modalOpen}
                onHide={() => setModalOpen(!modalOpen)}
                aria-labelledby="example-modal-sizes-title-xl"

            >
                
                <Modal.Body><YoutubeEmbed embedId={movieTrailerKey.key}  /></Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalBox