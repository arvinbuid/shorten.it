import type { Dispatch, SetStateAction } from 'react';

import Modal from '@mui/material/Modal';
import CreateNewShortenUrl from './CreateNewShortenUrl';

interface ShortenUrlPopupProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const ShortenUrlPopup = ({ open, setOpen }: ShortenUrlPopupProps) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        // https://mui.com/material-ui/react-modal/
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex justify-center items-center w-full h-full">
                <CreateNewShortenUrl setOpen={setOpen} />
            </div>
        </Modal>
    );
}

export default ShortenUrlPopup;