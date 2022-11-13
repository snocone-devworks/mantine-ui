import { MantineColor } from "@mantine/core";
import { hideNotification, showNotification, updateNotification } from "@mantine/notifications";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { fixedMessage } from "../theme/defaults";
import { NotifyType } from "../types";
import { useMantineUITheme } from "./useMantineUITheme";

export type NotifyReturn = {
  id: string;
  dismiss(): void | Promise<void>;
  update(type: NotifyType, message: React.ReactNode, persist?: boolean): void | Promise<void>;
}

export const useNotify = () => {
  const themeInfo = useMantineUITheme();

  if (!themeInfo) {
    throw new Error('useNotify must be within a MantineUIThemeProvider');
    return;
  }

  const color = (type: NotifyType): MantineColor => {
    if (type === 'error') return themeInfo.colors.error;
    if (type === 'info' || type === 'loading') return themeInfo.colors.info;
    if (type === 'success') return themeInfo.colors.success;
    return themeInfo.colors.brand;
  }

  const icon = (type: NotifyType): React.ReactNode | undefined => {
    if (type === 'error') return themeInfo.notify.icons.error;
    if (type === 'info') return themeInfo.notify.icons.info;
    if (type === 'success') return themeInfo.notify.icons.success;
    return undefined;
  }

  const messageText = (type: NotifyType, message: React.ReactNode): React.ReactNode => {
    let wrappers = themeInfo.notify.messageWrappers;

    if (typeof message === 'string') {
      if (type === 'error' && wrappers.error) return wrappers.error(message);
      if (type === 'info' && wrappers.info) return wrappers.info(message);
      if (type === 'loading' && wrappers.loading) return wrappers.loading(message);
      if (type === 'success' && wrappers.success) return wrappers.success(message);

      return (
        <>
          {fixedMessage(message)}
        </>
      );
    }

    return message;
  }

  const onDismiss = (id: string) => hideNotification(id);

  const onUpdate = (id: string, type: NotifyType, message: React.ReactNode, persist?: boolean) => {
    updateNotification({
      id: id,
      title: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      message: messageText(type, message),
      color: color(type),
      icon: icon(type),
      disallowClose: type === 'loading',
      loading: type === 'loading',
      autoClose: persist ? false : true
    });
  }

  const notify = (type: NotifyType, message: React.ReactNode, persist?: boolean): NotifyReturn => {
    let id: string = uuidv4();

    showNotification({
      id: id,
      title: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
      message: messageText(type, message),
      color: color(type),
      icon: icon(type),
      disallowClose: type === 'loading',
      loading: type === 'loading',
      autoClose: persist === true ? false : true
    });

    return {
      id: id,
      dismiss: function() {
        onDismiss(this.id)
      },
      update: function(type: NotifyType, message: React.ReactNode, persist?: boolean) {
        onUpdate(this.id, type, message, persist)
      }
    }
  };

  return notify;
}