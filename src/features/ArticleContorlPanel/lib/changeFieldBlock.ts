import { ArticleBlock, ArticleBlockType } from '@/entities/Article';
import { ChangeFieldBlockIdentType } from '../model/types/articleContorlPanelSchema';

export const changeFieldBlock = (
      value: string,
      selectedBlock: ArticleBlock,
      currentBlock: ArticleBlock,
      ident?: ChangeFieldBlockIdentType,
    ): ArticleBlock => {
      if (currentBlock.id === selectedBlock.id) {
        if (
          !currentBlock ||
          currentBlock.type !== selectedBlock.type
        ) {
          return selectedBlock;
        }

        switch (currentBlock.type) {
          case ArticleBlockType.CODE:
            return {
              ...currentBlock,
              code: value,
            };

          case ArticleBlockType.IMAGE:
            if (ident === 'src')
              return { ...currentBlock, src: value };
            if (ident === 'title')
              return { ...currentBlock, title: value };
            return currentBlock;

          case ArticleBlockType.TEXT:
            if (ident === 'title')
              return { ...currentBlock, title: value };
            if (ident === 'paragraphs')
              return { ...currentBlock, paragraphs: [value] };
            return currentBlock;

          default:
            return selectedBlock;
        }
      }

      return currentBlock;
    };