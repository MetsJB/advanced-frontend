import { Article } from '@/entities/Article';

export interface ArticleContorlPanelSchema {
  isLoading: boolean;
  error?: string;
  readonly?: boolean;
  data?: Partial<Article>;
  form?: Partial<Article>;
}

export type ChangeFieldBlockIdentType =
  | 'src'
  | 'title'
  | 'paragraphs';
