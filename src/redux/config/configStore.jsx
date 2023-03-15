import { configureStore } from '@reduxjs/toolkit';
import signupRadio from '../module/signup';
import loginRadio from '../module/login';
import userFollow from '../module/userFollow';
import createRadio from '../module/createRadio';
import getRadio from '../module/getRadio';

const sotre = configureStore({
    reducer: {
        signup: signupRadio.reducer,
        login: loginRadio.reducer,
        userFollowing: userFollow.reducer,
        creatingRadio: createRadio.reducer,
        gettingRadio: getRadio.reducer,
    },
});

export default sotre;
