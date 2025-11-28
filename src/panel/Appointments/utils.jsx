import React from 'react';
import Modal from '../../components/shared/Modal';

export const UpdateOfferModal = ({ open, onClose, row }) => {
  return (
    <Modal isOpen={open} onClose={onClose} position='center' title={'Dealership Info'}></Modal>
  );
};
