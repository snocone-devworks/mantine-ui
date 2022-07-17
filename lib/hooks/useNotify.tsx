import { MantineColor } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React from "react";
import { RiErrorWarningFill, RiInformationFill, RiThumbUpFill } from "react-icons/ri";
import { useThemeContext } from "../theme";
import { fixMessage } from "../theme/helpers";
import { NotifyType } from "../theme/types";

export type NotifyReturnType = {
  id: string;
  dismiss(): void;
  update(type: NotifyType, message: React.ReactNode, persist?: boolean): void;
}

export const useNotify = () => {
  const notifications = useNotifications();
  const themeInfo = useThemeContext();

  if (!themeInfo || !notifications) {
    throw new Error('useNotify must be within a ThemeProvider');
  }

  const color = (type: NotifyType): MantineColor => {
    if (type === 'error') return themeInfo.colors.error;
    if (type === 'info' || type === 'loading') return themeInfo.colors.info;
    if (type === 'success') return themeInfo.colors.success;
    return themeInfo.colors.primary;
  }

  const icon = (type: NotifyType): React.ReactNode | undefined => {
    if (type === 'error') return themeInfo.notify.icons.error ?? <RiErrorWarningFill />;
    if (type === 'info') return themeInfo.notify.icons.info ?? <RiInformationFill />;
    if (type === 'success') return themeInfo.notify.icons.success ?? <RiThumbUpFill />;
    return undefined;
  }

  const messageText = (type: NotifyType, message: React.ReactNode): React.ReactNode => {
    let wrappers = themeInfo.notify.messageWrappers;

    if (typeof message === 'string') {
      if (type === 'error' && wrappers.error) return wrappers.error(message);
      if (type === 'info' && wrappers.info) return wrappers.info(message);
      if (type === 'loading' && wrappers.loading) return wrappers.loading(message);
      if (type === 'success' && wrappers.success) return wrappers.success(message);

      return fixMessage(message);
    }

    return message;
  }

  const titleText = (type: NotifyType): string => String(type).charAt(0) + String(type).slice(1);

  const onDismiss = (id: string) => notifications.hideNotification(id);

  const onUpdate = (id: string, type: NotifyType, message: React.ReactNode, persist?: boolean) => {
    notifications.updateNotification(id, {
      id: id,
      title: titleText(type),
      message: messageText(type, message),
      color: color(type),
      icon: icon(type),
      disallowClose: type === 'loading',
      loading: type === 'loading',
      autoClose: persist ? false : true
    });
  }

  const notify = (type: NotifyType, message: React.ReactNode, persist?: boolean): NotifyReturnType => ({
    id: notifications.showNotification({
      title: titleText(type),
      message: messageText(type, message),
      color: color(type),
      icon: icon(type),
      disallowClose: type === 'loading',
      loading: type === 'loading',
      autoClose: persist ? false : true
    }),
    dismiss: function() {
      onDismiss(this.id)
    },
    update: function(type: NotifyType, message: string, persist?: boolean) {
      onUpdate(this.id, type, message, persist)
    }
  });

  return notify;
}