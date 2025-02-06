import { create } from 'zustand';

type TForm = {
    user_id: number;
    user_name: string;
    city: string;
    birth_date: string;
    sex: string;
    images: string[];
    short_desc: string;
    long_desc: string;
    categories: string[];
    geolocation: number[];
};

type TCreateProfileState = {
    nextIndex: number;
    pages: number;
    currentIndex: number;
    errorMessage: string;
    currentPage: boolean;
    isFirstRender: boolean;
    isNextButtonDisabled: boolean;
    isPreviousButtonDisabled: boolean;
    isChooseInterestsActive: boolean;
    isDatePickerVisible: boolean;
    isErrorMessageVisible: boolean;
    isFieldCorrect: boolean;
    form: TForm;
};

type TCreateProfileActions = {
    actions: {
        next: () => void;
        prev: () => void;
        setFirstRender: () => void;
        unsetFirstRender: () => void;
        changeCurrentIndex: () => void;
        disableCountinueButton: () => void;
        disableBackButton: () => void;
        activateCountinueButton: () => void;
        activateBackButton: () => void;
        toggleContent: () => void;
        toggleCurrentPage: () => void;
        setUserName: (name: string) => void;
        setCity: (city: string) => void;
        setGeolocation: (coords: number[]) => void;
        showDatePicker: () => void;
        hideDatePicker: () => void;
        setBirthDate: (birthDate: string) => void;
        setLongDesc: (longDesc: string) => void;
        setSex: (sex: string) => void;
        setImages: (images: string) => void;
        showErrorMessage: () => void;
        hideErrorMessage: () => void;
        setFieldIsCorrect: () => void;
        setFieldIsIncorrect: () => void;
        setErrorMessage: (error: string) => void;
    };
};

type TCreateProfileStore = TCreateProfileState & TCreateProfileActions;

const createProfileStore = create<TCreateProfileStore>((set) => ({
    nextIndex: 0,
    currentIndex: 0,
    pages: 7,
    errorMessage: '',
    currentPage: false, // false - slider, true - chooseInterests
    isFirstRender: true,
    isNextButtonDisabled: false,
    isPreviousButtonDisabled: false,
    isChooseInterestsActive: false,
    isDatePickerVisible: false,
    isErrorMessageVisible: false,
    isFieldCorrect: false,
    form: {
        user_id: 0,
        user_name: '',
        city: '',
        birth_date: '',
        sex: '',
        images: [],
        short_desc: '',
        long_desc: '',
        categories: [],
        geolocation: [],
    },
    actions: {
        next: () => set((state) => ({ nextIndex: state.nextIndex + 1 })),

        prev: () =>
            set((state) => ({ nextIndex: Math.max(state.nextIndex - 1, 0) })),
        setFirstRender: () => set({ isFirstRender: true }),
        unsetFirstRender: () => set({ isFirstRender: false }),
        changeCurrentIndex: () =>
            set((state) => ({ currentIndex: state.nextIndex })),
        disableCountinueButton: () => set({ isNextButtonDisabled: true }),
        disableBackButton: () => set({ isPreviousButtonDisabled: true }),
        activateCountinueButton: () => set({ isNextButtonDisabled: false }),
        activateBackButton: () => set({ isPreviousButtonDisabled: false }),
        toggleContent: () =>
            set((state) => ({
                isChooseInterestsActive: !state.isChooseInterestsActive,
            })),
        toggleCurrentPage: () =>
            set((state) => ({ currentPage: !state.currentPage })),
        setUserName: (name: string) =>
            set((state) => ({ form: { ...state.form, user_name: name } })),
        setCity: (city: string) =>
            set((state) => ({ form: { ...state.form, city } })),
        setGeolocation: (coords: number[]) =>
            set((state) => ({ form: { ...state.form, geolocation: coords } })),
        showDatePicker: () => set({ isDatePickerVisible: true }),
        hideDatePicker: () => set({ isDatePickerVisible: false }),
        setBirthDate: (birthDate: string) =>
            set((state) => ({
                form: { ...state.form, birth_date: birthDate },
            })),
        setLongDesc: (longDesc: string) =>
            set((state) => ({ form: { ...state.form, long_desc: longDesc } })),
        setSex: (sex: string) =>
            set((state) => ({ form: { ...state.form, sex: sex } })),
        setImages: (image: string) =>
            set((state) => ({
                form: { ...state.form, images: [...state.form.images, image] },
            })),
        showErrorMessage: () => set({ isErrorMessageVisible: true }),
        hideErrorMessage: () => set({ isErrorMessageVisible: false }),
        setFieldIsCorrect: () => set({ isFieldCorrect: true }),
        setFieldIsIncorrect: () => set({ isFieldCorrect: false }),
        setErrorMessage: (error) => set((state) => ({ errorMessage: error })),
    },
}));

export default createProfileStore;
