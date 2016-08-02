import {Store, compose, createStore} from 'redux';
import {IStore} from '~react-router-redux~redux/redux';
import rootReducer from './components/common/reducers/rootReducer';

const initialState = {
    open: false
};

export const store: any = createStore (
    rootReducer,
    initialState,
    compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
