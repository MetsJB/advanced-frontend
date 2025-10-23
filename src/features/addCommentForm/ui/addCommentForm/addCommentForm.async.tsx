import { FC, lazy } from 'react';
import { addCommentFormProps } from './addCommentForm';

export const addCommentFormAsync = lazy<FC<addCommentFormProps>>(
    () => import('./addCommentForm'),
);
