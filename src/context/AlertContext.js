import React, { createContext, useState, useContext } from 'react';
import RPGAlert from '../components/app/RPGAlert';

const AlertContext = createContext({});

export function AlertProvider({ children }) {
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: 'Cancelar',
    showCancel: false,
    onConfirm: null,
    onCancel: null,
    onClose: null,
    autoClose: false,
    autoCloseDelay: 2000,
  });

  const showAlert = ({
    title,
    message,
    type = 'info',
    confirmText = 'OK',
    cancelText = 'Cancelar',
    showCancel = false,
    onConfirm,
    onCancel,
    onClose,
    autoClose = false,
    autoCloseDelay = 2000,
  }) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      showCancel,
      onConfirm,
      onCancel,
      onClose,
      autoClose,
      autoCloseDelay,
    });
  };

  const hideAlert = () => {
    const onClose = alertConfig.onClose;
    setAlertConfig(prev => ({ ...prev, visible: false }));
    if (onClose) {
      setTimeout(() => onClose(), 300);
    }
  };

  const handleConfirm = () => {
    const onConfirm = alertConfig.onConfirm;
    setAlertConfig(prev => ({ ...prev, visible: false }));
    if (onConfirm) {
      setTimeout(() => onConfirm(), 300);
    }
  };

  const handleCancel = () => {
    const onCancel = alertConfig.onCancel;
    setAlertConfig(prev => ({ ...prev, visible: false }));
    if (onCancel) {
      setTimeout(() => onCancel(), 300);
    }
  };

  // Atalhos para tipos específicos
  const showSuccess = (title, message, options = {}) => {
    showAlert({
      title,
      message,
      type: 'success',
      autoClose: true,
      autoCloseDelay: 5000,
      ...options,
    });
  };

  const showError = (title, message, options = {}) => {
    showAlert({
      title,
      message,
      type: 'error',
      ...options,
    });
  };

  const showWarning = (title, message, options = {}) => {
    showAlert({
      title,
      message,
      type: 'warning',
      ...options,
    });
  };

  const showInfo = (title, message, options = {}) => {
    showAlert({
      title,
      message,
      type: 'info',
      ...options,
    });
  };

  const showConfirm = (title, message, onConfirm, options = {}) => {
    showAlert({
      title,
      message,
      type: 'warning',
      showCancel: true,
      onConfirm,
      ...options,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm,
        hideAlert,
      }}
    >
      {children}
      <RPGAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
        showCancel={alertConfig.showCancel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={hideAlert}
        autoClose={alertConfig.autoClose}
        autoCloseDelay={alertConfig.autoCloseDelay}
      />
    </AlertContext.Provider>
  );
}

// Hook customizado para usar o Alert
export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert deve ser usado dentro de um AlertProvider');
  }
  return context;
}

export default AlertContext;
