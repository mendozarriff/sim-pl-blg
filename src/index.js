import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostsIndex from './components/posts_index';
import promise from 'redux-promise';

import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import Header from './components/header';

import App from './App';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/posts/new" component={PostsNew} />
                <Route path="/posts/:id" component={PostsShow} />
                < Route path="/" component={PostsIndex} />
            </Switch>
        </div>
            
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));