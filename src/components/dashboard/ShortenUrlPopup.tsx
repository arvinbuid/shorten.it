import type { Dispatch, SetStateAction } from 'react';
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { TransformedShortenUrlData } from '../../hooks/useQuery';

import Modal from '@mui/material/Modal';
import CreateNewShortenUrl from './CreateNewShortenUrl';

interface ShortenUrlPopupProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TransformedShortenUrlData, Error>>
}

const ShortenUrlPopup = ({ open, setOpen, refetch }: ShortenUrlPopupProps) => {

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
                <CreateNewShortenUrl setOpen={setOpen} refetch={refetch} />
            </div>
        </Modal>
    );
}

export default ShortenUrlPopup;