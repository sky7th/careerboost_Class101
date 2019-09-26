import { faFileAlt, faFolderPlus, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { compose, withProps } from 'recompose';
import Content, { Props } from './Content';

interface OuterProps {
  currentPath: string;
  onLinkClick?: () => void;
}

const enhance = compose<Props, OuterProps>(
  withProps<{}, Props>(({
    onLinkClick,
  }) => ({
    elements: [
      [
        {
          text: '전체 할 일',
          icon: faFileAlt,
          path: '/',
        },
      ],
    ],
    onLinkClick: onLinkClick || (() => null),
  })),
);

export default enhance(Content);
