'use strict';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import React from 'react';
import {render} from 'react-dom';
import * as mobx from 'mobx'
import TodoApp from "TodoApp";

// ----------------------------------------------------

mobx.useStrict(true);
render(<TodoApp/>, document.getElementById('app'));