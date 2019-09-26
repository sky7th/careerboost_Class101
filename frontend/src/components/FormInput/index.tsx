import { compose, withProps } from 'recompose';
import FormInput, { Props } from './FormInput';

interface RecomposeProps {
  label?: string;
  name: string;
  value: string;
  onChange: () => Event;
  error: string;
  touched: boolean;
  type?: string;
}

const enhance = compose<Props, RecomposeProps>(
  withProps(({ label, name, touched, error }: Props) => ({
    label: label || name,
    hasError: Boolean(error) && touched,
  })),
);

export default enhance(FormInput);
