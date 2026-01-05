import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlock } from '../../model/types/article';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextArea } from '@/shared/ui/redesigned/TextArea';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticlePanelBlocksProps {
  blocks: ArticleBlock[];
  className?: string;
  readonly?: boolean;
  onChangeCode?: (code: string, block: ArticleBlock) => void;
  onChangeInput?: (text: string, block: ArticleBlock) => void;
  onChangeParagraphs?: (text: string, block: ArticleBlock) => void;
  onChangeURL?: (text: string, block: ArticleBlock) => void;
}

export const ArticlePanelBlocks = memo(
  (props: ArticlePanelBlocksProps) => {
    let contentBlock;
    const {
      className,
      onChangeCode,
      onChangeInput,
      onChangeURL,
      onChangeParagraphs,
      blocks,
      readonly,
    } = props;
    const [block, setBlock] = useState('1');
    const { t } = useTranslation();

    const onChangeBlock = (blockId: string) => {
      setBlock(blockId);
    };

    const handleEnterText = useCallback(
      (
          callback?: (value: string, currBlock: ArticleBlock) => void,
          currBlock?: ArticleBlock,
        ) =>
        (value: string) => {
          if (currBlock) {
            callback?.(value, currBlock);
          }
        },
      [],
    );

    const options = useMemo(() => {
      const collator = new Intl.Collator(undefined, {
        numeric: true,
      });

      return blocks
        .map((elemBlocks, index) => {
          return {
            value: elemBlocks.id,
            content: elemBlocks.id,
          };
        })
        .sort((a, b) => collator.compare(a.value, b.value));
    }, [blocks]);

    const currentBlock = blocks.find(
      (elemBlock) => elemBlock.id === block,
    );

    if (currentBlock?.type === ArticleBlockType.CODE) {
      contentBlock = (
        <TextArea
          readonly={readonly}
          notResize
          onChange={handleEnterText(onChangeCode, currentBlock)}
          className={classNames('', {}, [className])}
          label={t('Код')}
          value={currentBlock.code}
        />
      );
    } else if (currentBlock?.type === ArticleBlockType.IMAGE) {
      contentBlock = (
        <VStack
          gap="8"
          className={classNames('', {}, [className])}
          max
        >
          <Input
            readonly={readonly}
            label={t('URL адрес')}
            value={currentBlock.src}
            onChange={handleEnterText(onChangeURL, currentBlock)}
          />
          <Input
            readonly={readonly}
            label={t('Заголовок блока')}
            value={currentBlock.title}
            onChange={handleEnterText(onChangeInput, currentBlock)}
          />
        </VStack>
      );
    } else {
      contentBlock = (
        <VStack
          max
          gap="8"
          justify="center"
          align="center"
          className={classNames('', {}, [className])}
        >
          <Input
            readonly={readonly}
            label={t('Заголовок блока')}
            value={currentBlock?.title}
            onChange={handleEnterText(onChangeInput, currentBlock)}
          />
          <TextArea
            readonly={readonly}
            notResize
            label={t('Параграфы')}
            onChange={handleEnterText(onChangeParagraphs, currentBlock)}
            value={currentBlock?.paragraphs.reduce(
              (prev, curr) => `${prev}${curr}`,
              '',
            )}
          />
        </VStack>
      );
    }

    return (
      <HStack max>
        <ListBox
          readonly={readonly}
          direction="top right"
          items={options}
          label={t('Блок № ')}
          value={block}
          onChange={onChangeBlock}
        />
        {contentBlock}
      </HStack>
    );
  },
);
