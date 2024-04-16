import { PropsWithChildren } from 'react';
import { AlertActionInterface } from '@vkontakte/vkui';

type AnchorHTMLAttributesOnly = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof React.HTMLAttributes<HTMLAnchorElement>
>;

type ExtendedAlertActionProps = Pick<AlertActionInterface, 'mode'>;

type OwnAlertActionProps = PropsWithChildren<{
  onClick: React.MouseEventHandler<HTMLElement>;
  handleBackButton: () => void;
}>;

export type AlertActionProps = ExtendedAlertActionProps &
  AnchorHTMLAttributesOnly &
  OwnAlertActionProps;
