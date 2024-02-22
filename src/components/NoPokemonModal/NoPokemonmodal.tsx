import React from 'react';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';

const NoPokemonModal: React.FC<{ open: any, onClose: any }> = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="no-pokemon-modal-title"
            aria-describedby="no-pokemon-modal-description"
        >
            <div>
                <h2 id="no-pokemon-modal-title">No Pokémon Found</h2>
                <p id="no-pokemon-modal-description">There is no Pokémon with such type on your list.</p>
            </div>
        </Modal>
    );
};

NoPokemonModal.propTypes = {
    open: PropTypes.any.isRequired,
    onClose: PropTypes.any.isRequired
};

export default NoPokemonModal;
