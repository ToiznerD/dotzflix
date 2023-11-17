import { create } from 'zustand';

export interface ModalStoreInterface{
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const useSearchModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false })
}));

export default useSearchModal;