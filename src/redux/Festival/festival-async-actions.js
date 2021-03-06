import {
  setActualFestival,
  setActualFestivalPosts,
  setFestivals,
  setFestival,
  setIsActualSelectedFestivals,
} from './festival-actions';
import request from '../../services/request';

export const fetchFestival = (id, isActual = true) => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `festivals/${id}`,
      });
      if (isActual) {
        dispatch(setActualFestival(data));
        dispatch(setIsActualSelectedFestivals(true));
      } else if (!isActual) {
        dispatch(setFestival(data));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAllFestivals = () => {
  return async (dispatch) => {
    try {
      const { data } = await request({
        method: 'GET',
        url: `festivals`,
      });
      dispatch(setFestivals(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchFestivalPosts = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await request({
        method: 'GET',
        url: `festivals/${id}/posts`,
      });
      dispatch(setActualFestivalPosts(data));
    } catch (e) {
      console.dir(e);
    }
  };
};
