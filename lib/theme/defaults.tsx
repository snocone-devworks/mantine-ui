import React from "react";
import { MdError, MdInfo, MdCheckCircle } from 'react-icons/md';
import { ColorConfig, GradientConfig, NotifyConfig } from "../types";

export const defaultColors: ColorConfig = {
  brand: 'cyan',
  error: 'red',
  info: 'violet',
  primary: 'blue',
  secondary: 'pink',
  success: 'teal',
  warn: 'yellow',
  textPrimary: 'black'
};

export const defaultGradients: GradientConfig = {
  brand: { from: 'cyan', to: 'grape' },
  error: { from: 'red', to: 'pink' },
  info: { from: 'violet', to: 'grape' },
  primary: { from: 'cyan', to: 'indigo' },
  secondary: { from: 'pink', to: 'violet' },
  success: { from: 'cyan', to: 'green' },
  warn: { from: 'yellow', to: 'orange' },
  textPrimary: { from: 'black', to: 'black' }
}

export const defaultNotify: NotifyConfig = {
  autoClose: 5000,
  limit: 5,
  position: 'bottom-right',
  icons: {
    error: <MdError />,
    info: <MdInfo />,
    success: <MdCheckCircle />
  },
  messageWrappers: {
    error: (message: string) => `${fixedMessage(message)}. If issue persists please contact support.`,
    info: (message: string) => `${fixedMessage(message)}`,
    loading: (message: string) => `${fixedMessage(message)}`,
    success: (message: string) => `${fixedMessage(message)}`
  }
}

export const fixedMessage = (message: string) => {
  let returnMessage: string = message.trim();
  returnMessage = returnMessage.charAt(0).toUpperCase() + returnMessage.slice(1);

  if (!['.', '!', '?'].includes(returnMessage.slice(-1))) returnMessage += '.';
  return fixedMessage;
}