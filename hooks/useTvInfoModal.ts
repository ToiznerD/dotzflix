import { create } from 'zustand';

export interface ModalStoreInterface{
    tvId?: string;
    isOpen: boolean;
    openModal: (tvId: string) => void;
    closeModal: () => void;
}

const useTvInfoModal = create<ModalStoreInterface>((set) => ({
    tvId: undefined,
    isOpen: false,
    openModal: (tvId: string) => set({ isOpen: true, tvId }),
    closeModal: () => set({ isOpen: false, tvId: undefined })
}));

export default useTvInfoModal;