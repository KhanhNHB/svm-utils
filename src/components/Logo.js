import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="SVM"
      style={{
        width: 129,
        height: 48,
      }}
      src="/home/logo-header-light.png"
      {...props}
    />
  );
};

export default Logo;
