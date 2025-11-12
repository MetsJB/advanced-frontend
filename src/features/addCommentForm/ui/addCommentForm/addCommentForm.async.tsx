import { FC, lazy } from 'react';
import { addCommentFormProps } from './addCommentForm';

export const AddCommentFormAsync = lazy<
  FC<addCommentFormProps>
>(() => import('./addCommentForm'));
