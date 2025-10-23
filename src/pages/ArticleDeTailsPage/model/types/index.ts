import { ArticelDetailsCommentsSchema } from './ArticelDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './articleDetailsPageRecommendationsSchema';

export interface ArticleDetailsPageSchema {
  comments: ArticelDetailsCommentsSchema;
  recommmendations: ArticleDetailsRecommendationsSchema;
}
