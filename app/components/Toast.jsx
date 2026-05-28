'use client'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastUtil() {
  return <ToastContainer />
}

export const Toast = toast;

export const warning = (WaringMessage = '', options = {}) => {
    if (WaringMessage)
    Toast.warn(WaringMessage, {
                autoClose: 2500,
                closeOnClick: false,
                className: "font-weight-bold text-white text-center",
                draggable: false,
                position: "bottom-center",
                ...options
            });
}

const success = (SuccessMessage = '', options = {}) => {
    if (SuccessMessage)
      return Toast.success(SuccessMessage, {
            autoClose: 2500,
            closeOnClick: false,
            draggable: false,
            toastId: "offline-toast",
            position: "bottom-center",
            ...options
        });
}

const error = (errorMessage = '', options = {}) => {
    if (errorMessage)
        Toast.error(errorMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            ...options
        });
}

const dismiss = (id = '') => {
    if (id === '') Toast.dismiss();
    else Toast.dismiss(id);
}

export const ToastComponent = {
    warning,
    success,
    error,
    dismiss,
}

export default function ToastProvider({ children }) {
    return (
        <>
            {children}
            <ToastUtil />
        </>
    );
}
