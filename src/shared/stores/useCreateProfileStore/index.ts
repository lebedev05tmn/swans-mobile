import { create } from 'zustand';

type TForm = {
    user_id: string;
    user_name: string;
    city: string;
    birth_date: string;
    sex: string;
    images: string[];
    description: string;
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
        activateBackButton: () => void;
        activateCountinueButton: () => void;
        addInterest: (interest: string) => void;
        changeCurrentIndex: () => void;
        deleteImage: (index: number) => void;
        disableBackButton: () => void;
        disableCountinueButton: () => void;
        hideDatePicker: () => void;
        hideErrorMessage: () => void;
        next: () => void;
        prev: () => void;
        removeInterest: (interest: string) => void;
        replaceImage: (index: number, image: string) => void;
        setBirthDate: (birthDate: string) => void;
        setCity: (city: string) => void;
        setDescription: (longDesc: string) => void;
        setErrorMessage: (error: string) => void;
        setFieldIsCorrect: () => void;
        setFieldIsIncorrect: () => void;
        setFirstRender: () => void;
        setGeolocation: (coords: number[]) => void;
        setImage: (images: string) => void;
        setSex: (sex: string) => void;
        setUserId: (id: string) => void;
        setUserName: (name: string) => void;
        showDatePicker: () => void;
        showErrorMessage: () => void;
        toggleContent: () => void;
        toggleCurrentPage: () => void;
        unsetFirstRender: () => void;
    };
};

type TCreateProfileStore = TCreateProfileState & TCreateProfileActions;

const useCreateProfileStore = create<TCreateProfileStore>((set) => ({
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
        user_id: '0',
        user_name: '',
        city: '',
        birth_date: '',
        sex: '',
        images: [],
        description: '',
        categories: [],
        geolocation: [],
    },
    actions: {
        next: () =>
            set((state) => ({
                nextIndex: state.nextIndex + 1,
                errorMessage: '',
            })),

        prev: () =>
            set((state) => ({
                nextIndex: Math.max(state.nextIndex - 1, 0),
                errorMessage: '',
            })),
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
        setDescription: (description: string) =>
            set((state) => ({
                form: { ...state.form, description: description },
            })),
        setSex: (sex: string) =>
            set((state) => ({ form: { ...state.form, sex: sex } })),
        setImage: (image: string) =>
            set((state) => ({
                form: { ...state.form, images: [...state.form.images, image] },
            })),
        deleteImage: (index: number) => {
            set((state) => ({
                form: {
                    ...state.form,
                    images: state.form.images.filter((_, i) => i !== index),
                },
            }));
        },
        replaceImage: (index: number, image: string) => {
            set((state) => ({
                form: {
                    ...state.form,
                    images: state.form.images.map((img, idx) =>
                        idx === index ? image : img,
                    ),
                },
            }));
        },
        showErrorMessage: () => set({ isErrorMessageVisible: true }),
        hideErrorMessage: () => set({ isErrorMessageVisible: false }),
        setFieldIsCorrect: () => set({ isFieldCorrect: true }),
        setFieldIsIncorrect: () => set({ isFieldCorrect: false }),
        setErrorMessage: (error) => set((state) => ({ errorMessage: error })),
        setUserId: (id: string) =>
            set((state) => ({ form: { ...state.form, user_id: id } })),
        addInterest: (interest: string) =>
            set((state) => ({
                form: {
                    ...state.form,
                    categories: [...state.form.categories, interest],
                },
            })),
        removeInterest: (interest: string) =>
            set((state) => ({
                form: {
                    ...state.form,
                    categories: state.form.categories.filter(
                        (i) => i !== interest,
                    ),
                },
            })),
    },
}));

export default useCreateProfileStore;
