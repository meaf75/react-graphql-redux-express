import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetupAxiosSecured } from '../constants/AxiosSecured';
import { AUTH_TOKEN_KEY } from '../constants/local_storage_keys';
import { OnUserLogin, OnUserLogout } from '../services/auth.service';
import { GetCurrentUser } from '../services/user.service';
import { SetUser } from '../store/app/AppAction';
import { handle } from '../utils/PromiseHandler';


export default function useConfigureStart() {
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);

  const LoadData = async () => {
    const user_token = localStorage.getItem(AUTH_TOKEN_KEY)

    if (!user_token) {
      // User does not contain the token so, login time
      setDataLoaded(true);
      return;
    }

    SetupAxiosSecured(dispatch, user_token);

    const [response, error] = await handle(GetCurrentUser());

    if (error) {
      // An error ocurred trying to get the user with the providen key
      OnUserLogout(dispatch)
      setDataLoaded(true);
      return;
    }

    const user = (response as AxiosResponse).data.data;
    
    dispatch(SetUser(user));
    OnUserLogin(dispatch,user_token);
    setDataLoaded(true);
  }

  useEffect(() => {
    LoadData();
  }, []);

  return dataLoaded;
}
