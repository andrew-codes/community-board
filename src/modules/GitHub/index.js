'use strict';

import actions from './Actions';
import * as api from './Api';

export const Name = 'GitHub';
export const Api = api;
export const Actions = actions;
export const AccountSource = {
    name: Name,
    actions
};